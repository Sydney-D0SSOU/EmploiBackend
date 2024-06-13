const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Recruteur = sequelize.define('Recruteur', {
  idE: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contact: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // Assuming email should be unique
  },
  sujet: {
    type: DataTypes.STRING,
    allowNull: false
  },
  localisation: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Detail: DataTypes.STRING
}, {});

module.exports = Recruteur;
