var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Application', new Schema({ 
    name: {
        unique: true,
        type: String
    },
    url: {
        unique: true,
        type: String
    },
    roles: Array,
    isDeleted: Boolean
},{
    collection: 'apps'
}));