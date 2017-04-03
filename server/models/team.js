var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema= new Schema({
    name:String,
    leader:{type:Schema.ObjectId},
    member:[{type:Schema.ObjectId}],
    goal:String,
    description:String,
    budget:{type:Schema.ObjectId},
    calender:{type:Schema.ObjectId},
    locale:{type:String, default:null},
    comment:[{type:Schema.ObjectId}],
    room:{type:Schema.ObjectId},
    popular: {
        like: [{
            _id:false,
            who:{type:Schema.ObjectId},
            date:{type:Date, default:Date.now}
        }],
        unlike: [{
            _id:false,
            who:{type:Schema.ObjectId},
            date:{type:Date, default:Date.now}
        }],
        block:[{
            _id:false,
            who:{type:Schema.ObjectId},
            date:{type:Date, default:Date.now}
        }],
    },

});


const ModelClass = mongoose.model('team', teamSchema);
module.exports = ModelClass;
