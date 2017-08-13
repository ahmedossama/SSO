// get the packages we need ============
// =======================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config.js'); // get our config file
var User = require('./models/user.js'); // get our mongoose model
var random = require("node-random");
var email = require("emailjs");

var randomNo;
var userData;
var yourEmail = 'sso.vodafone@gmail.com';
var yourPwd = 'sso_vodafone';
var yourSmtp = 'smtp.gmail.com';
var smtpServer = email.server.connect({
    user: yourEmail,
    password: yourPwd,
    host: yourSmtp,
    ssl: true,
    port: 465,
    timeout: 30000
});
// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// routes ================
// =======================
// basic route
app.get('/', function (req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

app.get('/setup', function (req, res) {

    // create a sample user
    var nick = new User({
        name: 'lobna.ali14@gmail.com',
        password: 'test',
        admin: true
    });

    // save the sample user
    nick.save(function (err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({ success: true });
    });
});

// API ROUTES -------------------
// we'll get to these in a second


// API ROUTES -------------------

// get an instance of the router for api routes
var apiRoutes = express.Router();

// TODO: route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function (req, res) {
    // find the user
    var email = req.body.email
    User.findOne({
        name: req.body.email
    }, function (err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' + req.body.name });
        } else if (user) {
            userData = user
            random.numbers({
                "number": 1,
                "minimum": 0,
                "maximum": 1000000
            }, function (error, data) {
                if (error) throw error;
                randomNo = data;
                smtpServer.send({
                    html: 'Hello!\nYou can now access your account with the following one time password:' +
                    randomNo
                    ,
                    from: yourEmail,
                    to: email,
                    subject: 'one time password for access',
                    attachment:
                    [
                        {
                            data: "<p>Hello!\nYou can now access your account with the following one time password: " +
                            "<span style='color: #4169E1'>" + randomNo + "</span></p>", alternative: true
                        }]
                }, function (err, message) {
                    if(err) throw err ;
                    res.json({
                        message: 'check your mail'
                    });
                });
            });


        }

    });
});
apiRoutes.post('/Confirmation', function (req, res) {
    // find the user
console.log(randomNo);
console.log(req.body.ontimePass)
    if (randomNo == req.body.ontimePass) {
        var token = jwt.sign(userData, app.get('superSecret'), { expiresIn: 1440 });

        // return the information including token as JSON
        res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
        });
    }else{
         res.status(401).send({
            success: false,
            message: 'error password.'
        });
    }

});
//  var token = jwt.sign(user, app.get('superSecret'),{expiresIn : 1440});

//         // return the information including token as JSON
//         res.json({
//           success: true,
//           message: 'Enjoy your token!',
//           token: token
//         });
// TODO: route middleware to verify a token
// route middleware to verify a token
// apiRoutes.use(function (req, res, next) {

//     // check header or url parameters or post parameters for token
//     var token = req.body.token || req.query.token || req.headers['x-access-token'];

//     // decode token
//     if (token) {

//         // verifies secret and checks exp
//         jwt.verify(token, app.get('superSecret'), function (err, decoded) {
//             if (err) {
//                 return res.json({ success: false, message: 'Failed to authenticate token.' });
//             } else {
//                 // if everything is good, save to request for use in other routes
//                 req.decoded = decoded;
//                 next();
//             }
//         });

//     } else {

//         // if there is no token
//         // return an error
//         return res.status(403).send({
//             success: false,
//             message: 'No token provided.'
//         });

//     }
// });

// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/', function (req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
});

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function (req, res) {
    User.find({}, function (err, users) {
        res.json(users);
    });
});



// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);
// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);

