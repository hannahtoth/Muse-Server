const Sequelize = require('sequelize')

const sequelize = new Sequelize("postgres://postgres:love5ever@localhost:5432/muse-server");

module.exports = sequelize
