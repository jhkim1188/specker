const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    public:{
        email: { type: String, unique: true, lowercase: true },
        name:{ type: String, lowercase:true },
        gender:{ type: String },
        age:{ type: Number },
        description:{ type: String },
        gravatar: {type:String},     //아바타 사진
        popular: {
            score:{type:Number, default:0},
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
        specker:[{type:Schema.ObjectId}],
        teams :[{type:Schema.ObjectId}],
        calendar:{type:Schema.ObjectId},
        rooms:[{type:Schema.ObjectId}],
        friends:[{type:Schema.ObjectId}],
        spec:[{type:Schema.ObjectId}],
        goal:[{
            _id:false,
            tag:{type:Schema.ObjectId},
            score:{type:Number, default:0}
        }],     //팔로우 50 더보기 1 스터디 500 검색 5 글쓸때 태그 5
        address : {     //추후 작업 요구
            placeId:String,
            location:{
                lat:String,
                lng:String
            },
            label:String
        }

    },
    private:{
        isValid:{type:String, default: 'invalid', lowercase:true},
        password: String,
        phone:String,
        created_at:{ type: Date, default: Date.now },
        lastSignInDate:{ type: Date, default: Date.now },
        role: {
            type: String,
            default: 'user'
        },
        provider: {
            type: { type: String, default: 'local', lowercase: true },
            id: Number
        }
    }

});



userSchema.pre('save', function(next){
    const user = this;

    bcrypt.genSalt(10, function(err, salt){
        if(err){
            return next(err);
        }

        bcrypt.hash(user.private.password, salt, null, function(err, hash){
            if(err){
                return next(err);
            }

            user.private.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, callback){

    bcrypt.compare(candidatePassword, this.private.password, function(err, isMatch){
        console.log("isMatch", isMatch);

        if(err){
            return callback(err);
        }
        callback(null, isMatch);
    });
};


const ModelClass = mongoose.model('user', userSchema);


module.exports = ModelClass;