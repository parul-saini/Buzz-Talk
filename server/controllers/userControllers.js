const user = require("../models/userModel");
const bcrypt = require("bcrypt");


module.exports.register = async(req,res,next)=>{
  try {
    const { userName, email, password} = req.body;
    //  if  user already exists 
    const userNamecheck = await user.findOne({userName});
    if(userNamecheck)
    return res.json({msg:"Username already exist", status : false});
    const userEmailcheck = await user.findOne({email});
    if(userEmailcheck)
    return res.json({msg:"Email already exist", status : false});
    
    const hashedPassword = await bcrypt.hash(password.toString(), 10);
    
    const newuser = await user.create({
     email,
     userName,
     password: hashedPassword
    })
    // don't need to return the password
    delete newuser.password;
    return res.json({ status: true , newuser});  
        
    } catch (error) {
        next(error);
    }   
};
