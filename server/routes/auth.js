const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/auth')

const User = require('../model/User')
const Admin = require('../model/Admin')

router.get('/',verifyToken, async(req,res)=>{
    try{
        const user = await User.findById(req.userId).select('-password')
        if(!user) {
            return res.status(400).json({success:false,message:'User not found'})
        }
        res.json({success:true,user})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message:'Internal server error'})
    }
})



router.post('/register',async (req,res) =>{
    const {username,password,avatar} = req.body

    if(!username || !password ){
        return res.status(400).json({success:false,message:'Missing username or password'})
    }
    try{
        const user = await User.findOne({username})

        if(user){
            return res.status(400).json({success:false, message:'Usernam already taken'})
        }

        const hashedPassword = await argon2.hash(password)
        const newUser = new User ({username,password:hashedPassword,avatar})
        await newUser.save()

        const accessToken = jwt.sign({userId: newUser._id},process.env.ACCESS_TOKEN_SECRET)

        res.json({success:true,message:'User created successfully',accessToken})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message:'Internal server error'})
    }
})

router.post('/login',async (req,res)=>{
    const{username,password} = req.body
    if(!username || !password){
        return res.status(400).json({success:false,message:'Missing username and/or password'})
    }
    try{
        const user = await User.findOne({username})
        if(!user){
            return res.status(400).json({success:false,message:'Incorrect username or password'})
        
        }
        const passwordValid = await argon2.verify(user.password,password)
        if(!passwordValid){
            return res.status(400).json({success:false,message:'Incorrect username or password'})
        }
        
        const accessToken = jwt.sign({userId: user._id},process.env.ACCESS_TOKEN_SECRET)
        res.json({success:true,message:'Logged in successfully',accessToken})

    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message:'Internal server error'})
    }
})

router.get('/admin',verifyToken, async(req,res)=>{
    try{
        const user = await Admin.findById(req.userId).select('-password')
        if(!user) {
            return res.status(400).json({success:false,message:'User not found'})
        }
        res.json({success:true,user})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message:'Internal server error'})
    }
})



router.post('/admin/register',async (req,res) =>{
    const {username,password,avatar} = req.body

    if(!username || !password ){
        return res.status(400).json({success:false,message:'Missing username or password'})
    }
    try{
        const user = await Admin.findOne({username})

        if(user){
            return res.status(400).json({success:false, message:'Usernam already taken'})
        }

        const hashedPassword = await argon2.hash(password)
        const newUser = new Admin ({username,password:hashedPassword,avatar})
        await newUser.save()

        const accessToken = jwt.sign({userId: newUser._id},process.env.ACCESS_TOKEN_SECRET)

        res.json({success:true,message:'User created successfully',accessToken})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message:'Internal server error'})
    }
})

router.post('/admin/login',async (req,res)=>{
    const{username,password} = req.body
    if(!username || !password){
        return res.status(400).json({success:false,message:'Missing username and/or password'})
    }
    try{
        const user = await Admin.findOne({username})
        if(!user){
            return res.status(400).json({success:false,message:'Incorrect username or password'})
        
        }
        const passwordValid = await argon2.verify(user.password,password)
        if(!passwordValid){
            return res.status(400).json({success:false,message:'Incorrect username or password'})
        }
        
        const accessToken = jwt.sign({userId: user._id},process.env.ACCESS_TOKEN_SECRET)
        res.json({success:true,message:'Logged in successfully',accessToken})

    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message:'Internal server error'})
    }
})

module.exports = router