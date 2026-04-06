const express = require('express');
const followupRouter = express.Router() 
const followupModel = require('../Modals/followupModel')
followupRouter.get('/' , async(req,res)=>{
    const followup = await followupModel.find().populate("uid").populate("enqid");
    return res.json({"msg":"success",followup})
})

followupRouter.post('/' , async(req,res)=>{
    const followup = req.body
    await followupModel.create(followup);
    return res.json({"msg":"success",'followup':followup});
})

module.exports = followupRouter;