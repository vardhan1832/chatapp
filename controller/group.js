const Chat = require('../models/chat')
const User = require('../models/user')
const Group = require('../models/group')
const UserGroup = require('../models/usergrp')

const postGroup = async (req,res,next)=>{
    try{
        const grp_name = req.body.groupName;
        const username = req.user.name;
        const data = await Group.create({groupname: grp_name})
        await UserGroup.create({UserId: req.user.id,groupId: data.id,admin: true})

        res.status(201).json({message: 'group created successfully', grpid: data.id})

    }catch(err){
        console.log("Error in getting group",err)
    }
}

const getGroup = async (req,res,next)=>{
    try{
        let groupObj = []
        const userid = req.user.id
        const groups = await UserGroup.findAll({where: { UserId: userid }})
        console.log(groups)
        for(let i=0;i<groups.length;i++){
            var grp = await Group.findOne({where : { id: groups[i].groupId}})
            groupObj.push(grp)
        }
        res.status(201).json({groups: groupObj})
    }catch(err){
        console.log(err)
    }
}
const getGroupChat = async (req,res,next)=>{
    try{
        const username = req.user.name
        const userid = req.user.id
        const groupId = req.header('groupId')
        const isadmin = await UserGroup.findOne({where: {UserId: userid,groupId: groupId}})
    
       // var lastid = req.params.lastid
        // if(lastid === undefined){
        //     lastid = 0;
        // }
        let chatArray = []
        let userArray = []
           // console.log(lastid)
        const chatobj = await Chat.findAll({
            where: { groupId: groupId }
        })
        if(chatobj){
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
        }
        const usersingroup = await UserGroup.findAll({where: {groupId: groupId}})
        if(usersingroup){
            for(let i=0;i<usersingroup.length;i++){
                const user = await User.findOne({where: {id: usersingroup[i].UserId}})
                const userobj = {
                    userId:user.id,
                    userName:user.name,
                    isadmin: usersingroup[i].admin
                }
                userArray.push(userobj)
            }
        }
        //const lastChatId = chatArray.length > 0 ? chatArray[chatArray.length - 1].id : lastid
    
        res.status(201).json({
            message: 'got all texts',
            chat: chatArray,
            user: username,
            userid: userid,
            groupId: groupId,
            groupUsers: userArray,
            isadmin: isadmin.admin
      })
    }catch(err){
        console.log('error in getting grp chat',err)
    }
}
const getuser = async (req,res,next)=>{
    try{
        const usermail = req.params.usermail;
        const groupId = req.header('groupId');
        const user = await User.findOne({where: { email: usermail}})
        if(!user){
           return res.status(200).json({message: 'user does not exist, provide correct email'})
        }else{
            const userid = user.id;
            const username = user.name;
            const addeduser = {
                id:userid,
                name:username
            }
            const ismember = await UserGroup.findOne({where: { UserId: userid,groupId : groupId}})
            if(ismember){
                res.status(201).json({message: 'user already a member'})
            }else{
                await UserGroup.create({UserId: userid,groupId: groupId,admin: false})
                res.status(201).json({message: "user added successfully",addeduser: addeduser})
            }
        }
    }catch(err){
        console.log(err)
    }
}
const removeUser = async (req,res,next)=>{
    try{
        const userId = req.params.userid;
        const groupId = req.header('groupId');
        const user = await UserGroup.findOne({where: { UserId: userId,groupId : groupId}})
        if(!user){
            throw new Error("user doesnt belong to the group")
        }else{
           await user.destroy()
           res.status(201).json({message: 'user removed successfully'})
        }
       
    }catch(err){
        console.log(err)
    }
}
const updateUserAdmin = async (req,res,next)=>{
    try{
        const userId = req.params.userid;
        const groupId = req.header('groupId');
        const user = await UserGroup.findOne({where: { UserId: userId,groupId : groupId}})
        if(!user){
            throw new Error("user doesnt belong to the group")
        }else{
           await user.update({admin: true})
           res.status(201).json({message: 'user removed successfully'})
        }
    }catch(err){
        console.log(err);  
    }
}

module.exports = {
    getGroup,
    postGroup,
    getGroupChat,
    getuser,
    removeUser,
    updateUserAdmin
}