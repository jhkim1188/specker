const userSchema = new Schema({
    public:{
        email: { type: String, unique: true, lowercase: true },
        name:{ type: String, lowercase:true },
        birthday:{ type: String },
        gender:{ type: String },
        height:{type:Number},
        weight:{type:Number},
        belong:{type:String},
        specialty:{type:String},
        hobby:{type:String},
        gravatar: {type:String},     //아바타 사진
        education:{type: String},
        profile:{type:Schema.ObjectId},

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