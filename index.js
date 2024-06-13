const express = require('express');
const { sequelize } = require('./models'); // Importer l'instance configurée de Sequelize
const bodyParser = require('body-parser');
const candidatrouter = require('./routes/candidat');
const recruteurrouter = require('./routes/recruteur');
const adminrouter = require('./routes/admin');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const port = 4000;

// Configuration de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentation du nouveau backend du projet zem ',
      version: '1.0.0',
      description: 'Documentation for my Node.js backend API'
    },
    servers: [
      {
        url: 'http://localhost:4000', // Mettez l'URL de votre serveur ici
        description: 'Development server'
      }
    ]
  },
  apis: ['./routes/*.js'] // Chemin vers vos fichiers de route où les spécifications Swagger sont définies
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());

// Route de base
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Test de connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie.');
    app.listen(port, () => {
      console.log(`Le serveur écoute sur le port ${port}`);
    });
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données:', err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/candidat', candidatrouter);
app.use('/recruteur',recruteurrouter);  
app.use('/admin',adminrouter)

module.exports = app;
