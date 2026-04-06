const express = require('express');
const adminModal = require('../Modals/adminModal');
const userModal = require("../Modals/userModal");
const stEnqModal = require('../Modals/stEnqModal');
const centerModal = require('../Modals/centerModal');
const  adminRoute= express.Router();


adminRoute.post('/log',async (req,res)=>{
    const {email,password}= req.body;
    const admin = await adminModal.findOne({email})
    if(admin){
        if(admin.password==password){
            res.json({msg:"success", role:"admin",id:admin._id});
        }
        else{
            res.json({msg:"Password Not Match"})
        }
    }
    else{
        const user = await userModal.findOne({email}) ;
        if(user){     
            if(user.password==password){
                if(user.status!="u"){
                    res.json({msg:"Your Account is Blocked"});
                }
                    res.json({msg:"success", role: user.role,id:user._id});
            }
            else{
                res.json({msg:"Password Not Match"})
            }
         }   
        else{
            res.json({"msg":"User Not found"});
        }
    }
})

adminRoute.get('/stats',async(req,res)=>{
    const enq = await stEnqModal.find();
    const user = await userModal.find();
    const center = await centerModal.find();
    res.json({"msg":"success", "enq":enq.length,"user":user.length,"center":center.length})
})


module.exports=adminRoute