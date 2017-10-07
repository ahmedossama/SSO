// =======================
// routes ================
// =======================
// basic route
var User = require('../models/user.js'); // get our mongoose model
var express = require('express');
var email = require("emailjs");
var Random = require("random-js");
var databaseManager = require('../dao/dataBaseManager.js')
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens


//========should be moved to config============
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
//==============================================


//======SHOULD BE REMOVEDDDDDDDDDD==============

var userData;
//===============================================
module.exports = function (app) {


    app.get('/', function (req, res) {
        res.send('Hello! The API is at http://localhost:' + '8000' + '/api');
    });


    // API ROUTES -------------------

    // get an instance of the router for api routes
    var apiRoutes = express.Router();

    // TODO: route to authenticate a user (POST http://localhost:8080/api/authenticate)
    apiRoutes.post('/authenticate', function (req, res) {
        // find the user
        var email = req.body.email
        databaseManager.getUser(email).then((user) => {
            console.log("got user", user)
            if (user) {
                console.log("log datamanager");
                    console.log(databaseManager);
                var random = Random.engines.mt19937().autoSeed();
                console.log("random", random);
                if (true) {
                    databaseManager.setPassword(email, random).then((user) => {
                        
                        res.send({
                            success: true,
                            message: 'Enjoy your token!',
                            user: user
                        });
                    });
                    // smtpServer.send({
                    //     html: 'Hello!\nYou can now access your account with the following one time password:' +
                    //     random,
                    //     from: yourEmail,
                    //     to: email,
                    //     subject: 'one time password for access',
                    //     attachment:
                    //     [
                    //         {
                    //             data: "<p>Hello!\nYou can now access your account with the following one time password: " +
                    //             "<span style='color: #4169E1'>" + random + "</span></p>", alternative: true
                    //         }]
                    // }, function (err, message) {
                    //     if (err) throw err;
                    //     res.json({
                    //         message: 'check your mail'
                    //     });
                    // });
                }

            }
        }, (err) => {
            console.log(err);

            if (err) throw err;
            res.json({ success: false, message: 'Authentication failed. User not found.' + req.body.email });
        })
    });
    apiRoutes.post('/Confirmation', function (req, res) {
        // find the user
        databaseManager.getPassword(req.body.email).then(tempPass => {


            if (tempPass == req.body.ontimePass) {
                var token = jwt.sign(userData, app.get('superSecret'), { expiresIn: 1440 });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            } else {
                res.status(401).send({
                    success: false,
                    message: 'error password.'
                });
            }
        })
    });

    // route to show a random message (GET http://localhost:8000/api/)
    apiRoutes.get('/', function (req, res) {
        res.json({ message: 'Welcome to the coolest API on earth!' });
    });

    // route to return all users (GET http://localhost:8000/api/users)
    apiRoutes.get('/users', function (req, res) {
        User.find({}, function (err, users) {
            res.json(users);
        });
    });



    // apply the routes to our application with the prefix /api
    app.use('/api', apiRoutes);
}

        databaseManager.setPassword("lobna.ali14@gmail.com",999999999).then((user) => {
            console.log(user)
        });