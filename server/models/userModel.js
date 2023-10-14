const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        min: 3,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:5
    },
    isAvatarImageSet:{
     type:Boolean,
     default:false
    },
<<<<<<< HEAD
    avataarImage:{
=======
    avatar:{
>>>>>>> b2791b9e2bf87f6296c4afd2e0df68f7299a58f5
     type:String,
     default:""
    }
})

module.exports= mongoose.model("Users",userSchema);