const Chat = require('../models/chat')
const User = require('../models/user')

const postChat = async (req,res,next)=>{
    try{
        const msg = req.body.msg;
        const username = req.user.name;
        const data = await Chat.create({chat: msg,UserId: req.user.id})

        res.status(201).json({message: 'msg sent succesfully',chat: data.chat,name: username})
    }catch(err){
        console.log('Error in posting chat', err)
    }
}
const getChat = async (req,res,next)=>{
    try{
        const username = req.user.name;
        let chatArray = []
        const chatobj = await Chat.findAll();
       // console.log(chatobj)
        for(let i=0;i<chatobj.length;i++){
            let user =  await User.findOne({where:{
                id: chatobj[i].UserId
            }})
            // console.log(chatobj[i].UserId)
            let resobj = {
                chat: chatobj[i].chat,
                name: user.name
            }
            chatArray.push(resobj)
        }
       // console.log(chatArray)
        res.status(201).json({message: 'got all texts', chat: chatArray,user: username})
    }catch(err){
        console.log(err)
    }
}


module.exports = {
    postChat,
    getChat
}