// ../models/candidat.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assurez-vous que le chemin est correct et qu'il pointe vers votre fichier de configuration Sequelize

const Candidat = sequelize.define('Candidat', {
  idCand: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nom: DataTypes.STRING,
  prenom: DataTypes.STRING,
  datenaiss: DataTypes.DATE,
  email: DataTypes.STRING,
  phone: DataTypes.INTEGER,
  jourdispo: DataTypes.DATE,
  cv: DataTypes.STRING, // Assuming the CV file path is stored as a string
  locality: DataTypes.STRING // New attribute added here
}, {});

module.exports = Candidat;
