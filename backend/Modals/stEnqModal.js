const mongoose= require('mongoose');
const  stEnqSchema = new mongoose.Schema({
    fullName:{
        type :String,
        required:true
    },
    college:{
        type:String,
        required:false
    },
    course:{
        type:String,
        required:false
    },
    branch:{
        type:String,
        required:false
    },
    year:{
        type:String,
        required:false
    },
    contactNumber:{
        type:String,
       
    },
    email:{
        type:String,

    },
    purpose:{
        type:String,

        required:false
    },
        address:{
        type:String
    },
    role:{
        type:String
    },
    center:{
        type:String
    },
    status:{
        type:String,
        default:'u'
    },
    assignto :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'adduser'
    },
    assignby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'adduser'
    },
    assigndate:{
        type:String
    }
    ,
    nextfollowupdate:{
        type:String
    },
    forprogram:{
        type:String
    },
    source:{
        type:String,
        default:'walk-in'
    },
    remark:{
        type:String
    }       

},{
    timestamps:true
}
)

module.exports= mongoose.model('StudentEnquiry',stEnqSchema);