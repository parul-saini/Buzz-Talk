const User = require("../models/userModel");
const bcrypt = require("bcrypt");


module.exports.register = async(req,res,next)=>{
  try {
    const { userName, email, password} = req.body;
    //  if  user already exists 
    const userNamecheck = await User.findOne({userName});
    if(userNamecheck)
    return res.json({msg:"Username already exist", status : false});
    const userEmailcheck = await User.findOne({email});
    if(userEmailcheck)
    return res.json({msg:"Email already exist", status : false});
    
    const hashedPassword = await bcrypt.hash(password.toString(), 10);
    
    const newuser = await User.create({
     email,
     userName,
     password: hashedPassword
    })
    // don't need to return the password
    // delete newuser.password; (it doesn't work for mongo db obj that's why crt new obj )
    const newuserWithoutPassword = { ...newuser._doc };
    delete newuserWithoutPassword.password;
   // console.log(newuserWithoutPassword);
    return res.json({ status: true, user: newuserWithoutPassword });     
    } 
    catch (error) {
      next(error);
    }   
};

module.exports.setAvatar = async(req,res,next)=>{
  try {
    const userId= req.params.id;
    const avataarImage = req.body.image;
    const newuser = await User.findByIdAndUpdate({_id: userId},{
      isAvatarImageSet:true,
      avataarImage
    });

    return res.json({ 
      isSet: newuser.isAvatarImageSet , 
      image: newuser.avataarImage
    });  
        
    } catch (error) {
        next(error);
    }   
};



module.exports.login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    // Check if the user already exists
    const existingUser = await User.findOne({ userName });
    if (!existingUser) {
      return res.json({ msg: "Incorrect Username or Password", status: false });
    }

    const isPasswordValid = await bcrypt.compare(
      password.toString(),
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.json({ msg: "Incorrect Username or Password", status: false });
    }

    // Don't return the password
    delete existingUser.password;
    //console.log(existingUser);
    return res.json({ status: true, user: existingUser });

  } 
  catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    // it will select all others users id expect the user itself ne= not select 
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "userName",
      "avataarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

