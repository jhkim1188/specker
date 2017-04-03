var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var specSchema= new Schema({
    name:String,
    depth:String,
    member:[String],
    like:{type:Number, default:0}
}).index({
    'name':'text',
});

const ModelClass = mongoose.model('spec', specSchema);
module.exports = ModelClass;