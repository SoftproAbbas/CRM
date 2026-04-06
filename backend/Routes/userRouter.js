const express = require('express')
const userModal = require('../Modals/userModal');
const stEnqModal = require('../Modals/stEnqModal');
const userRouter= express.Router();
const upload = require('../Middleware/upload');
userRouter.get('/',async(req,res)=>{
        const adduser = await userModal.find();
        return res.json({"msg":"success" ,"adduser":adduser})
})
userRouter.post('/', async (req,res)=>{
    const adduser = await userModal.create(req.body);
    return res.json({'msg':"success"});
});

userRouter.patch('/:id',upload.single("profilePic"), async (req,res)=>{
    const id = req.params.id;
      await userModal.findByIdAndUpdate(id, {
        profilePic: req.file.filename   // 👈 correct
    });
    return res.json({'msg':"success"});
});




userRouter.put('/:id/:st',async(req,res)=>{
    const {id,st} = req.params;
    const status = st=="u"?"b":"u";
    const user = await userModal.findByIdAndUpdate(id,{status});
    if(st=="u"){
        await stEnqModal.updateMany({assignto:user._id},{$set:{assignto:null}})
    }
    return res.json({"msg":"success"});

})


userRouter.get('/:id', async (req,res)=>{
    const id = req.params.id;
    const adduser = await userModal.findById(id);
     return res.json({"msg":"success","adduser":adduser})

});

userRouter.put('/:id', async (req,res)=>{
    const id = req.params.id;
     await userModal.findByIdAndUpdate(id,req.body)
     return res.json({"msg":"success"})

});
userRouter.delete('/:id', async (req,res)=>{
    const id = req.params.id;
     await userModal.findByIdAndDelete(id)
     return res.json({"msg":"success"})
})
module.exports= userRouter;