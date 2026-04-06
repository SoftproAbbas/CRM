const mongoose= require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
       mobile:{
        type:String,
        required:true
    },
       role:{
        type:String,
        required:true
    },
       center:{
        type:String,
        required:true
    },
    password:{
        type:String,
        default:"1234"
    },
    status:{
        type:String,
        default:"u"

    },
    qua:{
        type:String
    },
    skills:{
        type:String,
    },
    exp:{
        type:String,
    },
    address:{
        type:String,
    },
    profilePic:{
        type:String,
    }
},{
    timestamps:true
})

module.exports= mongoose.model("adduser",userSchema);