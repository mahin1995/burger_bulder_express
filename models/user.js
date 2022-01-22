const Joi = require('joi')
const jwt=require('jsonwebtoken')
const {Schema,model}=require('mongoose')
const userSchema=Schema({
    email:{
        type:String,
        require:true,
        unique:true,
        minlength:5,
        maxlength:255
    },
    password:{
        type:String,
        require:true,
        minlength:5,
        maxlength:1024,
    }
})
userSchema.methods.generateJWT=function(){
    const token=jwt.sign({_id:this._id,email:this.email},process.env.JWT_SECCREATE_KEY,{expiresIn:"3h"})
    return token
}

const validateUser=user=>{
    const schema=Joi.object({
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(255).required()
    })
    return schema.validate(user)
}


module.exports.User=model('User',userSchema)
module.exports.validate=validateUser