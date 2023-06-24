const Chat = require('../models/chat')
const User = require('../models/user')
const { Op } = require('sequelize');


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
const getChat = async (req, res, next) => {
    try {
      const username = req.user.name
      const userid = req.user.id
      var lastid = req.params.lastid
      if(lastid === undefined){
        lastid = 0;
      }
      let chatArray = []
        console.log(lastid)
      const chatobj = await Chat.findAll({
        where: {
          id: {
            [Op.gt]: lastid
          }
        }
      })
  
      for (let i = 0; i < chatobj.length; i++) {
        const user = await User.findOne({
          where: {
            id: chatobj[i].UserId
          }
        })
  
        const resobj = {
          chat: chatobj[i].chat,
          name: user.name,
          id: chatobj[i].id
        }
        chatArray.push(resobj)
      }
  
      const lastChatId = chatArray.length > 0 ? chatArray[chatArray.length - 1].id : lastid
  
      res.status(201).json({
        message: 'got all texts',
        chat: chatArray,
        user: username,
        lastid: lastChatId,
        userid: userid
      })
    } catch (err) {
      console.log(err)
    }
  }


module.exports = {
    postChat,
    getChat
}