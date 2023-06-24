const Chat = require('../models/chat')
const User = require('../models/user')
const Group = require('../models/group')
const UserGroup = require('../models/usergrp')

const postGroup = async (req,res,next)=>{
    try{
        const grp_name = req.body.groupName;
        const username = req.user.name;
        const data = await Group.create({groupname: grp_name})
        await UserGroup.create({UserId: req.user.id,groupId: data.id})

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

module.exports = {
    getGroup,
    postGroup
}