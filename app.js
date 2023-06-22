const express = require('express')
const bodyparser = require('body-parser')
const sequelize = require('./util/database')
const cors = require('cors')
require('dotenv').config();

const app = express()
app.use(cors({
    origin: '*'
}))

const signinroutes = require('./routes/user')

app.use(bodyparser.json({ extended: false }));

app.use('/user',signinroutes)

sequelize.sync()
.then(res=>{
    app.listen(3000)
}).catch(err=>{
    console.log(err)
})

