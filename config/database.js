// ../config/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('empts', 'root', 'dgc@lavI08092003', {
  host: '127.0.0.1',
  port: 4306,
  dialect: 'mysql'
});

module.exports = sequelize;
