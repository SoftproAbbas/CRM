const express = require('express');
const assignModel = require('../Modals/assignModel');
const assignRouter = express.Router();

assignRouter.post('/', async (req,res)=>{
    await assignModel.create(req.body);
    return res.json({"msg":"success"});
})

assignRouter.get('/' ,async (req,res)=>{
        const assign= await assignModel.find().populate('enqid').populate('assignto').populate('assignby');
        return res.json({"msg":"success",assign});
})

module.exports= assignRouter

