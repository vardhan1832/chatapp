const express = require('express')
const bodyparser = require('body-parser')
const sequelize = require('./util/database')
const cors = require('cors')
require('dotenv').config();

const app = express()
app.use(cors({
    origin: '*'
}))

const User = require('./models/user')
const Chat = require('./models/chat')

const signinroutes = require('./routes/user')
const chatroutes = require('./routes/chat')

app.use(bodyparser.json({ extended: false }));

app.use('/user',signinroutes)
app.use(chatroutes)

User.hasMany(Chat)
Chat.belongsTo(User)

sequelize.sync()
.then(res=>{
    app.listen(3000)
}).catch(err=>{
    console.log(err)
})

