var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var messageSchema= new Schema({
    room:{type:Schema.ObjectId},
    from:{type:Schema.ObjectId},
    date:{type:Date, default:Date.now},
    message:String
});

const ModelClass = mongoose.model('message', messageSchema);
module.exports = ModelClass;