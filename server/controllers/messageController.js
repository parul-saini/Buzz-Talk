const messageModel = require("../models/messageModel");

const { ObjectId } = require('mongodb');



module.exports.addMessages = async(req,res,next)=>{
   try {
    const {from,to,message } = req.body;
    const data  = await messageModel.create({
        message: {text: message},
        users:[from,to],
        sender: from
    });
    const msg_id= data._id.toString();
    if(data) return res.json({msgId:msg_id, msg:"added the messages in database successfully!"});
    else return res.json({msgId:null , msg:"failed to add the messages in database "});
    
   } catch (error) {
     next(error);
   }
}


module.exports.getAllMessages = async(req,res,next)=>{
  try {
    const {from,to} = req.body;
    const allmessages = await messageModel.find({
      users:{
        $all: [from,to]
      },
    }).sort({updateAt:1});
     
    const projectMessage = allmessages.map((msg)=>{
        return{
          message: msg.message.text,
          fromSelf: msg.sender.toString() === from,
          id:msg._id.toString()
        }
    })
    return res.json(projectMessage);

  } catch (error) {
    next(error);
  }
}

module.exports.deleteMessage=async(req,res,next)=>{
 try {
  const {id} = req.body;
  const result = await messageModel.deleteOne({"_id" : new ObjectId(id)});
  if (result.deletedCount === 1) {
    res.json({status:true,msg:"Successfully deleted Your message"})
  } else {
    res.json({status:false,msg:"Some error occurred! Try again"})
  }
 } 
 catch (error) {
  next(error);
 }

}



