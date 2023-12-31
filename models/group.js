const sequelize = require('../util/database')
const Sequelize = require('sequelize')

const Group = sequelize.define('group',{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    groupname:{
        type:Sequelize.STRING,
        allowNull: false
    }
})
module.exports = Group;