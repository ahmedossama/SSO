
var mongoose = require('mongoose');
var User = require('../models/user.js'); // get our mongoose model
var App = require('../models/app.js'); // get our mongoose model
var Role = require('../models/role.js'); // get our mongoose model


function getUser(email) {
    return User.findOne({
        email: email
    });
}

function insertUser(userDate) {
    return User.findOne({ email: userDate.email }).exec().then(user => {
        console.log(user)
        if (!user) {
            return User.findOneAndUpdate({ email: userDate.email }, { $set: { email: userDate.email, username: userDate.userName, staffId: userDate.staffId } }, { upsert: true }).exec().then(data => {
                return { success: true };
            });
        } else {
            return { success: false };

        }
    });

}
function getApp(app_name) {
    return App.findOne({
        name: app_name
    });
}

function setPassword(email, password) {
    return User.findOneAndUpdate({ email: email }, { $set: { password: password } }, { new: true }).exec();
}

function getPassword(email) {
    return User.findOne({ email: email }).exec().then(user => {
        return user.password;
    });
}

function getRoleByUser(uidd) {
    return Role.findOne({
        uuid: uidd
    });
}

function getUserById(userId) {
    return User.findOne({
        "_id": userId
    }).exec();
}

function setUserToken(id, token) {
    return User.findOneAndUpdate({ "_id": id },
        { $set: { authToken: token } },
        { new: true }).exec();

}

function getUserDataByToken(token) {

}
module.exports = {
    setPassword: setPassword,
    getUser: getUser,
    getPassword: getPassword,
    getApp: getApp,
    getRoleByUser: getRoleByUser,
    getUserById: getUserById,
    setUserToken: setUserToken,
    insertUser: insertUser

}

