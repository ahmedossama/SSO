var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({ 
    email: {
        unique: true,
        type: String
    }, 
    password: String,
    username: String,
    staffId: {
        unique: true,
        type: Number
    },
    applications: Array,
    isDeleted: Boolean,
    authToken: String
},{
    collection: 'users'
}));


