const mongoose= require('mongoose');
const assignSchema = mongoose.Schema({
    enqid:{
        type:String,
        ref:'StudentEnquiry'
    },
    assignby:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'assignbyModel'
    },
    assignbyModel:{
        type:String,
        enum:['adduser','admin']
    }
    ,
    assignto:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'adduser'
    },
    remark:{
        type:String
    },
    status:{
        type:String,
        default:'u'
    }
},{
    timestamps:true
})

module.exports=mongoose.model('assign',assignSchema);