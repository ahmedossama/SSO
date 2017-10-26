// =======================
// routes ================
// =======================
// basic route
var User = require('../models/user.js'); // get our mongoose model
var express = require('express');
var Random = require("random-js");
var databaseManager = require('../dao/dataBaseManager.js')
var userSrv = require('../services/user.service')
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var app = express();

module.exports = function (app) {

    app.all('/*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
        res.header("Access-Control-Allow-Methods", "GET, POST", "PUT");
        next();
    });

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
            if (!user) {
                res.status(400).json({ success: false, message: 'Authentication failed. User not found.)' });
                return;
            }
            delete user.password;
            var random = new Random(Random.engines.mt19937().autoSeed());
            var tempPass = random.integer(1, 100000);
            databaseManager.setPassword(email, tempPass).then((user) => {
                userSrv.sendMail(email, tempPass).then((data) => {

                    res.json({ user: user, message: 'check your email' });
                });
            }).catch(err => {
                console.log("error setting password for user", err)
                res.status(500).json({ success: false, message: 'Internal server error occured while setting password for the user' });
            });

        }, (err) => {
            res.status(401).json({ success: false, message: 'Authentication failed. User not found.' + req.body.email });
        }).catch(err => {
            res.status(500).json({ success: false, message: 'Internal server error occured while getting user' });
            console.log("error getting the user", err)
        })
    });
    apiRoutes.post('/Confirmation', function (req, res) {
        // find the user
        var email = req.body.email;
        databaseManager.getUser(email).then(user => {
            if (!user) {
                res.status(400).json({ success: false, message: 'Authentication failed. User not found.)' });
                return;
            }
            delete user.password;
            delete user.authToken;
            if (user.password == req.body.ontimePass) {
                var token = jwt.sign({ user: user }, app.get('superSecret'), { expiresIn: 1440 });
                // var data = jwt.verify(token, app.get('superSecret'));
                databaseManager.setUserToken(user._id, token).then(() => {
                    res.status(200).cookie("SSOC", token, { maxAge: 1440 });
                    res.json({
                        success: true,
                        message: "user successfully authenticated"
                    })

                })
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
    // apiRoutes.get('/users', function (req, res) {
    //     User.find({}, function (err, users) {
    //         res.json(users);
    //     });
    // });

    apiRoutes.post('/id/user', function (req, res) {
        let userId = req.body.userId;
        databaseManager.getUserById(userId).then(user => {
            if (user) {
                res.status(200).json({
                    success: true,
                    user: user
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: 'no user found with Id ' + userId + ' in SSO db'
                })
            }
        }).catch(err => {
            res.status(500).json({ success: false, message: 'Internal server error occured while getting user', error: err });

        })
    })

    apiRoutes.post('/authToken/user', function (req, res) {
        let token = req.body.authToken;
        // console.log(token)
        // console.log(jwt.verify(token),app.get('superSecret'))
        let userData = jwt.decode(token);
        res.status(200).json({
            userData: userData
        })

    })

    apiRoutes.post('/verifyToken', function (req, res) {
        let token = req.body.authToken;
        let decodedToken = jwt.decode(token);
        let dateNow = new Date();
        console.log(dateNow.getTime())
        console.log(decodedToken.exp)
        if (decodedToken.exp < dateNow.getTime()) {
            res.status(401).json({
                valid: false,
                success: false,
                message: 'user token expired'
            })
            return;
        }
        databaseManager.getUserById(decodedToken.user._id).then((user) => {
            if (!user) {
                res.status(401).json({
                    valid: false,
                    message: 'user not found'
                })
                return;
            } else {
                res.status(200).json({
                    valid: true
                    
                })
            }
        }).catch(err => {
            res.status(500).json({ 
                valid: false,
                success: false, 
                message: 'Internal server error occured while setting password for the user' });

        })


    })

    //  apiRoutes.post('token/user', function (req, res) {
    //      console.log("234567890=")
    //     let token = req.body.token;
    //     // let userData = jwt.decode(token);
    //     res.status(200).json({

    //     })
    //     console.log(userData)
    // })





    // apply the routes to our application with the prefix /api
    app.use('/api', apiRoutes);

}

// databaseManager.getPassword("lobna.ali14@gmail.com").then((user) => {
//     console.log(user)
// });