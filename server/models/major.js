var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var majorSchema= new Schema({
    name:String,
    depth:String,
    member:[String],
    like:{type:Number, default:0}
}).index({
    'name':'text',
});



const ModelClass = mongoose.model('major', majorSchema);
module.exports = ModelClass;
