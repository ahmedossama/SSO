var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Role', new Schema({ 
    uuid: String,
    role: String,
    applicationName: String,
    isDeleted: Boolean
},{
    collection: 'roles'
}));