const sequelize = require('../util/database')
const Sequelize = require('sequelize')

const UserGroup = sequelize.define('usergroup',{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
})
module.exports = UserGroup;