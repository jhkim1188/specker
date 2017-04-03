var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema= new Schema({
    isteam:{type:Boolean, default:false},
    chatroom:{type:Schema.ObjectId}, //socket.io _id
    member:[{type:Schema.ObjectId}],
    message:[{type:Schema.ObjectId}]

});


const ModelClass = mongoose.model('room', roomSchema);
module.exports = ModelClass;
