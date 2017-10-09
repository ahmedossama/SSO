// =======================
// routes ================
// =======================
// basic route
var User = require('../models/user.js'); // get our mongoose model
var express = require('express');
var Random = require("random-js");
var databaseManager = require('../dao/dataBaseManager.js')
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var app = express();

//==============================================



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
            
            if (user) {
                var random = new Random(Random.engines.mt19937().autoSeed());
                var tempPass = random.integer(1, 100000);
                databaseManager.setPassword(email, tempPass).then((user) => {
                    databaseManager.sendMail(email, tempPass).then(function (data) {
                        res.json({ user: user, message: 'check your email' });
                    });
                });
            } else {
                res.status(401).json({ success: false, message: 'Authentication failed. User not found.' + req.body.email });

            }
        }, (err) => {
            res.json({ success: false, message: 'Authentication failed. User not found.' + req.body.email });
        })
    });
    apiRoutes.post('/Confirmation', function (req, res) {
        // find the user
        var email = req.body.email;
        databaseManager.getUser(email).then(user => {
            if (user.password == req.body.ontimePass) {
                var token = jwt.sign({ user: user }, app.get('superSecret'), { expiresIn: 1440 });
                // var data = jwt.verify(token, app.get('superSecret'));
                res.status(200).send({
                    success: true,
                    token: token
                });

            } else {
                res.status(401).send({
                    success: false
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

// databaseManager.getPassword("lobna.ali14@gmail.com").then((user) => {
//     console.log(user)
// });