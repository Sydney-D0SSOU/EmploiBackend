const express = require('express');
const { sequelize } = require('./models'); // Importer l'instance configurée de Sequelize
const bodyParser = require('body-parser');
const candidatrouter = require('./routes/candidat');
const recruteurrouter = require('./routes/recruteur');
const agencerouter = require('./routes/agence');
const adminrouter = require('./routes/admin');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const port = 4001;

// Configuration de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentation du nouveau backend du projet 🏍️ ',
      version: '1.0.0',
      description: 'Documentation for my Node.js backend API'
    },
    servers: [
      {
        url: 'http://localhost:${port}/api-docs', // Mettez l'URL de votre serveur ici
        description: 'Development server'
      }
    ]
  },
  apis: ['./routes/*.js'] // Chemin vers vos fichiers de route où les spécifications Swagger sont définies
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
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
      console.log(` Documentation Swagger disponible à l'adresse http://localhost:${port}/api-docs`);	
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
app.use('/agence',agencerouter)

module.exports = app;
