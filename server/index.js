const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
require("dotenv").config();


app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("hello world");
})

mongoose.connect(process.env.MongoDb_url,{
    useNewUrlParser:true,
   // usUnifiedTopology :true,
}).then(()=>{
   console.log("Db connected successfully");
}).catch((e)=>{
  console.log("Db not connected :( ",e);
})

const server = app.listen(process.env.PORT,()=>{
    console.log(`server start at port ${process.env.PORT}`);
})

