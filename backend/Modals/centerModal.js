const mongoose = require('mongoose');
const centerSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
        address:{
        type:String,
        required:true
    },
     status:{
        type:String,
        required:true
    }

})

module.exports =mongoose.model('center',centerSchema);