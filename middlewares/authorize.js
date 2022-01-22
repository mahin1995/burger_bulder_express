const jwt=require('jsonwebtoken');
const { trim } = require('lodash');

module.exports=function(req,res,next){
    let token=req.header('Authorization');
    if(!token) res.status(401).send('Access denied. No token provider')
    try{
        const decoded=jwt.verify(token.split(" ")[1].trim(),process.env.JWT_SECCREATE_KEY)
        req.user=decoded;
        next()
    }catch(err){
        return res.status(400).send('Invalid Token')
    }
}