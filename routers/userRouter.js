const express=require('express')
const router=express.Router()
const _ =require('lodash')
const bcrypt=require('bcrypt')
const {User,validate}=require('../models/user')


const newUser=async (req,res)=>{
    const {error}=validate(req.body)
    if(error)return res.status(400).send(error.details[0].message)
    let user=await User.findOne({email:req.body.email})
    if(user) return res.status(400).send('User already register')
    user=new User(_.pick(req.body,['email','password']))
    const salt=await bcrypt.genSalt(10)
    user.password=await bcrypt.hash(user.password,salt)
    const token=user.generateJWT()
    const result =await user.save()

    return res.status(201).send({
        token:token,
        user:_.pick(result,['_id','email'])
    })
}

const authuser=async (req,res)=>{
    let user=await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send('Invalid email or password')
    
    const validuser=await bcrypt.compare(req.body.password,user.password)
    if(!validuser)return res.status(400).send('Invalid email or password')

    const token =user.generateJWT()
    res.send({
        token:token,
        user:_.pick(user,['_id','email'])
    })
}

router.route('/')
        .post(newUser)
        

router.route('/auth')
        .post(authuser)

module.exports=router