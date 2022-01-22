const express=require('express')
const {Orders}=require('../models/order')
const router=express.Router()
const authorize=require('../middlewares/authorize')

const newOrder=async (req,res)=>{
    const order=new Orders(req.body)
    try{
        await order.save();
        return res.status(201).send("Order Place Successfully")
    }
    catch(e){
        return res.status(400).send("sorry Something went wrong!!")
    }
}

const orderList=async (req,res)=>{
    const orders=await Orders.find({
        userId:req.user._id
    }).sort({orderTime:-1})
    res.send(orders)
}


router.route('/')
        .get(authorize,orderList)
        .post(authorize,newOrder)

module.exports=router