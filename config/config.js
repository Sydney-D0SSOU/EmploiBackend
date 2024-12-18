require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
  },
  test: {
    username: 'votre_nom_utilisateur', // Remplace par tes informations de test si nécessaire
    password: 'votre_mot_de_passe',
    database: 'nom_de_votre_base_de_donnees_test',
    host: '127.0.0.1',
    port: 4306,
    dialect: 'mysql'
  },
  production: {
    username: 'votre_nom_utilisateur', // Remplace par tes informations de production
    password: 'votre_mot_de_passe',
    database: 'nom_de_votre_base_de_donnees_production',
    host: '127.0.0.1',
    port: 4306,
    dialect: 'mysql'
  }
};
