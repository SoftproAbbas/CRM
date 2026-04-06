const mongoose =  require('mongoose');
const visitorSchema = mongoose.Schema({
    'name':{
        type:String,
        required:true
    },
      'contact':{
        type:String,
        required:true
    },
      'email':{
        type:String,
        required:true
    },
      'purposeO':{
        type:String,
        required:false
    },
      'remark':{
        type:String,
        required:false
    },
    'role':{
        type:String,
        required:true
    },
    'center':{
        type:String,
        required:true
    },
    'status':{
        type:String,
        required:true
    }
})
module.exports= mongoose.model('visitor',visitorSchema);