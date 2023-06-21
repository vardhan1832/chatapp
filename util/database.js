const Sequelize = require('sequelize');

const sequelize = new Sequelize('chatapp', 'root', 'nikenduku', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;