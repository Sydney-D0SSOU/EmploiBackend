'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Chemin vers votre configuration de base de données

const Admin = sequelize.define('Admin', {
  idAdmin: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Admins', // Optionnel, si vous voulez spécifier un nom de table différent
  // timestamps: false // Supprimez ou commentez cette ligne pour activer les timestamps automatiques
});

// Définir les associations dans une fonction séparée
Admin.associate = (models) => {
  Admin.hasMany(models.Agence, { foreignKey: 'idAdmin' });
};

module.exports = Admin;
