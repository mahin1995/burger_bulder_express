const express=require('express')
const cors=require('cors')
const app=express()
var morgan = require('morgan')
const userRouter=require('./routers/userRouter')
const orderRouter=require('./routers/orderRouter')


app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use('/user',userRouter)
app.use('/order',orderRouter)
module.exports=app
