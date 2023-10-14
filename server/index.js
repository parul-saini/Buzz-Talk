const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const useRoutes = require("./routes/userRoutes");

const app = express();
require("dotenv").config();


app.use(cors());
app.use(express.json());

app.use("/api/auth",useRoutes);


mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
   useUnifiedTopology :true,
}).then(()=>{
   console.log("Db connected successfully");
}).catch((e)=>{
  console.log("Db not connected :( ",e);
})

const server = app.listen(process.env.PORT,()=>{
    console.log(`server start at port ${process.env.PORT}`);
})

