const express = require('express')
const centerModal = require('../Modals/centerModal');
const userModal = require('../Modals/userModal');
const stEnqModal = require('../Modals/stEnqModal');
const centerRoute = express.Router()

centerRoute.get('/',async (req,res)=>{
    const center = await centerModal.find();
    return res.json({"msg":"success" ,"center":center})
});

centerRoute.post('/', async(req,res)=>{
    await centerModal.create(req.body);
    return res.json({"msg":"success"})
});

centerRoute.get('/:id', async(req,res)=>{
    const id = req.params.id;
  const center =   await centerModal.findById(id);
    return res.json({"msg":"success","center":center})
});

centerRoute.put('/:id', async(req,res)=>{
    const id = req.params.id;
  const center =   await centerModal.findByIdAndUpdate(id,req.body);
    return res.json({"msg":"success"});
});

centerRoute.put('/:id/:st' , async(req,res)=>{
const {id,st} = req.params;
const status = st=="Active"?"Deactive":"Active";
const ust =st=="Active"?"b":"u";
const est =st=="Active"?"b":"u";
const center = await centerModal.findByIdAndUpdate(id,{status});
await userModal.updateMany({center:center.name},{$set:{status:ust}});
await stEnqModal.updateMany({center:center.name},{$set:{status:est}});

return res.json({"msg":"success",'center':center});
})


centerRoute.delete('/:id' , async(req,res)=>{
    const id = req.params.id;
      await centerModal.findByIdAndDelete(id);
    return res.json({"msg":"success"});
});

module.exports= centerRoute;