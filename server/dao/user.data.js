

function getUser(email) {
    return User.findOne({
        email: email
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

function getUserDataByToken(token){
    
}

module.exports = {
    setPassword: setPassword,
    getUser: getUser,
    getPassword: getPassword,
    getUserById: getUserById,
    setUserToken: setUserToken

}