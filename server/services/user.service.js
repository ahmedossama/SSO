var mailer = require('nodemailer-promise');
var config = require('../config.js'); // get our config file

var yourEmail = config.email;
var yourPwd = config.password;
var yourSmtp = 'smtp.gmail.com';

var smtpServer = mailer.config({
    email: yourEmail,
    password: yourPwd,
    server: yourSmtp
});

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

module.exports = {
    sendMail: sendMail
}