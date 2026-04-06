const express = require('express')
const visitorModal = require('../Modals/visitorModal')
const visitorRoute = express.Router()

visitorRoute.get('/',async (req,res)=>{
    const visitor = await visitorModal.find();
    return res.json({"msg":"success" ,"visitor":visitor})
});

visitorRoute.post('/', async(req,res)=>{
    await visitorModal.create(req.body);
    return res.json({"msg":"success"})
});

visitorRoute.get('/:id', async(req,res)=>{
    const id = req.params.id;
  const visitor=   await visitorModal.findById(id);
    return res.json({"msg":"success","visitor":visitor})
});

visitorRoute.put('/:id', async(req,res)=>{
    const id = req.params.id;
  const visitor =   await visitorModal.findByIdAndUpdate(id,req.body);
    return res.json({"msg":"success"});
});
visitorRoute.delete('/:id' , async(req,res)=>{
    const id = req.params.id;
      await visitorModal.findByIdAndDelete(id);
    return res.json({"msg":"success"});
});

module.exports= visitorRoute;