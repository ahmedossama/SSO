
var mongoose = require('mongoose');
var User = require('../models/user.js'); // get our mongoose model



function getUser(email) {
   return User.findOne({
        email: email
    }).exec();
}

function setPassword(email, password) {
    console.log("email",email);
    console.log("password",password);
  return User.findOneAndUpdate({email: email}, {$set:{password: password}}, {new: true}).exec();
}
function getPassword(email) {
  return User.findOne({email: email}).exec().then(user=>{
      return user.password;
  });
}
module.exports = {
    setPassword: setPassword,
    getUser: getUser,
    getPassword: getPassword

}

