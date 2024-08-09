'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Chemin vers votre configuration de base de données

const Agence = sequelize.define('Agence', {
  idAgence: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Localisation: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  idAdmin: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Admins',
      key: 'idAdmin'
    }
  }
}, {});

Agence.associate = function(models) {
  // associations can be defined here
  Agence.belongsTo(models.Admin, { foreignKey: 'idAdmin' });
};

module.exports = Agence;
