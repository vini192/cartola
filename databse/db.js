const Sequelize = require('sequelize')

const connection = new Sequelize('cartola', 'root', '', {
    host: 'localhost', 
    dialect: 'mysql'
}) // nome do bd, user, senha 

module.exports = connection;