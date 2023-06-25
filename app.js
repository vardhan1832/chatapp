const express = require('express')
const path = require('path');
const bodyparser = require('body-parser')
const cors = require('cors')
require('dotenv').config();

const sequelize = require('./util/database')
const app = express()
app.use(cors({
    origin: '*'
}))

const User = require('./models/user')
const Chat = require('./models/chat')
const Group = require('./models/group')
const UserGroup = require('./models/usergrp')

const signinroutes = require('./routes/user')
const chatroutes = require('./routes/chat')
const grouproutes = require('./routes/group')

app.use(bodyparser.json({ extended: false }));

app.use('/user',signinroutes)
app.use(chatroutes)
app.use(grouproutes)

app.use((req,res)=>{
    console.log('url',req.url)
    console.log('hello everyoone')
    res.sendFile(path.join(__dirname,`views/${req.url}`))
})


User.hasMany(Chat)
Chat.belongsTo(User)

User.belongsToMany(Group , {through: UserGroup})
Group.belongsToMany(User, {through: UserGroup})

Group.hasMany(Chat)
Chat.belongsTo(Group)

sequelize
.sync()
// .sync({force: true})
.then(res=>{
    app.listen(3000)
}).catch(err=>{
    console.log(err)
})

