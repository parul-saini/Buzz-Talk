const messageModel = require("../models/messageModel");
const MessageModel = require("../models/messageModel");

module.exports.addMessages = async(req,res,next)=>{
   try {
    const {from,to,message } = req.body;
    const data  = await MessageModel.create({
        message: {text: message},
        users:[from,to],
        sender: from
    });

    if(data) return res.json({msg:"added the messages in database successfully!"});
    else return res.json({msg:"failed to add the messages in database "});
    
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
          fromSelf: msg.sender.toString() === from
        }
    })

    return res.json(projectMessage);

  } catch (error) {
    next(error);
  }
}