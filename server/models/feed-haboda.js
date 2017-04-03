var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedSchema= new Schema({
    status:{type:Number, default:0},
    user:{type:Schema.ObjectId},
    view:[{type:Schema.ObjectId}],
    date:{type:Date, default:Date.now},
    content:String,
    title:{ type:String, default:'' },
});


const ModelClass = mongoose.model('feed', feedSchema);
module.exports = ModelClass;
