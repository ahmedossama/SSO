
var mongoose = require('mongoose');
var User = require('../models/user.js'); // get our mongoose model
var mailer = require('nodemailer-promise');
var config = require('../config.js'); // get our config file

//========should be moved to config============
var yourEmail = config.email;
var yourPwd = config.password;
var yourSmtp = 'smtp.gmail.com';

var smtpServer = mailer.config({
    email: yourEmail,
    password: yourPwd,
    server: yourSmtp
});

function getUser(email) {
    return User.findOne({
        email: email
    }).exec();
}

function setPassword(email, password) {
    return User.findOneAndUpdate({ email: email }, { $set: { password: password } }, { new: true }).exec();
}
function sendMail(email, random) {
    var options = {
        subject: 'one time password for access',
        senderName: yourEmail,
        receiver: email,
        html: "<p>Hello!\nYou can now access your account with the following one time password: " +
        "<span style='color: #4169E1'>" + random + "</span></p>"
    };
    return smtpServer(options)
        .then(function (info) { return info })   // if successful
        .catch(function (err) { console.log('got error', err); return err });
}
function getPassword(email) {
    return User.findOne({ email: email }).exec().then(user => {
        return user.password;
    });
}
module.exports = {
    setPassword: setPassword,
    getUser: getUser,
    getPassword: getPassword,
    sendMail: sendMail

}

