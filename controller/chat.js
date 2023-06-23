const Chat = require('../models/chat')

const postChat = async (req,res,next)=>{
    try{
        const msg = req.body.msg;
        const username = req.user.name;
        const data = await Chat.create({chat: msg,UserId: req.user.id})
        console.log(data.dataValues.chat)
        res.status(201).json({message: 'msg sent succesfully',chat: data.dataValues.chat, user: username})
    }catch(err){
        console.log('Error in posting chat', err)
    }
}


module.exports = {
    postChat
}