const sequelize = require('../util/database')
const Sequelize = require('sequelize')

const User = sequelize.define('User',{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    phonenumber:{
        type: Sequelize.STRING,
        allowNull:false,
        unique: true
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
})
module.exports = User;