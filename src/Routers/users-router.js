const express = require('express')
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth')
const multer = require('multer');
const sharp = require('sharp')
const {sendWelcome , sendWhyDelete} = require('../emails/account')

//Create new user
router.post('/users',async (req,res)=>{
    const user = new User(req.body)
    try{
        const token = await user.generatedAuthToken()
        await user.save()
        sendWelcome(user.email,user.name)
        res.status(201).send({ user , token})
    }catch(e){
        res.status(400).send(e)
    }
})

//Update user
router.patch('/users/me', auth , async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','age','email','password'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))
    if(!isValidOperation) return res.status(400).send("invalid operation")
    try{
        updates.forEach(key => req.user[key] = req.body[key])
        await req.user.save()
        res.send(req.user)
    }catch(e){
        res.status(500).send(e)
    }
})

//read profie
router.get('/users/me', auth ,async (req,res)=>{ 
    res.send(req.user)
})
    



router.delete('/users/me',auth,async (req,res)=>{
    await req.user.remove()
    sendWhyDelete(req.user.email,req.user.name)
    res.send(req.user)
})

router.post('/users/login', async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password);
        const token = await user.generatedAuthToken()
        res.send({ user , token })
    }catch(e){
        res.status(400).send(e.message)
    }
} )

router.post('/users/logout',auth,async (req,res)=>{
    try{
        if(!req.token) throw Error()
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token )
        await req.user.save();
        res.send(req.user)
    }catch(e){
        res.sataus(500).send(e)
    }
})

router.post('/users/logoutAll', auth , async (req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save();
        res.send(req.user)
    }catch(e){
        res.status(500).send(e)
    }
})

const upload = multer({
    limits:{
        fileSize:1000000,
    },
    fileFilter (req,file,cb) {
        if(!file.originalname.match(/.*\.(jpe?g|png)$/)){
            cb(Error('please upload a file that end up with jpg , jpeg or png'))
        }
        cb(undefined,true)
    }

})

router.post('/users/me/avatar', auth ,upload.single('avatar') , async (req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

router.delete('/users/me/avatar',auth, async (req,res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send(req.user)
})

router.get('/users/:id/avatar', async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar) return res.status(404).send()

        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(400).send(e)
    }
})



module.exports = router;