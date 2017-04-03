var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedSchema= new Schema({
    user:{
        _id:{type:Schema.ObjectId},
        name:{type:String},
        gravatar:{type:String}
    },
    thumb:{
        img:{type:String},
        title:{type:String},
        content:{type: String},
    },
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
    view:[{type:Schema.ObjectId}],

    date:{type:Date, default:Date.now},
    tag:[{type:Schema.ObjectId}],
    mention:[{type:Schema.ObjectId}],
    content:String,
    title:{ type:String, default:'' },
    comment:[{type:Schema.ObjectId}]
});


const ModelClass = mongoose.model('feed', feedSchema);
module.exports = ModelClass;
