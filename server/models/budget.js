var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var budgetSchema= new Schema({
    date: {type:Date, default:Date.now},
    from:{type:Schema.ObjectId},
    amount:{type:Number, default:0},
    description:String
});


const ModelClass = mongoose.model('budget', budgetSchema);
module.exports = ModelClass;
