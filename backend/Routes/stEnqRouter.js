const express = require('express');
const StEnqModal = require('../Modals/stEnqModal');
const stEnqRouter=  express.Router();
stEnqRouter.get('/',async(req,res)=>{
    const user = await StEnqModal.find().populate('assignto')
    return res.json({"msg":"sucess" ,'enq':user});
})

stEnqRouter.post('/', async(req,res)=>{
    const user = req.body;
    await StEnqModal.create(user)
    return res.json({'msg':'succes'})
})

stEnqRouter.get('/:id',async (req,res)=>{
    const id = req.params.id;
    const user= await StEnqModal.findById(id);
    res.json({"msg":"success","user":user});
})
stEnqRouter.put('/:id',async (req,res)=>{
    const id = req.params.id;
    await StEnqModal.findByIdAndUpdate(id,req.body);
    res.json({"msg":"Update"});
})
stEnqRouter.delete('/:id',async (req,res)=>{
    const id = req.params.id;
    await StEnqModal.findByIdAndDelete(id);
    res.json({"msg":"Delete"});
})



module.exports= stEnqRouter;