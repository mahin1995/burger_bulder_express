const dotenv = require('dotenv');
dotenv.config()//if file name .env dont need to specify te file name
const app =require('./app')
const mongoose =require('mongoose')
mongoose.connect(
    process.env.MONGODB_SERVER,{
        useNewUrlParser:true
    }
).then(()=>console.log("connected to Mongodb"))
.catch((err)=>console.log("Mongodb connection fail"))

const port=process.env.PORT || 3001
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})