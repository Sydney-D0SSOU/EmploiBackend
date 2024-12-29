const Agence = require('../models/agence');
const path = require('path');
const fs = require('fs');
const transporter = require('../config/mailer');

// CRUD operations

// Créer une nouvelle agence
exports.create = async (req, res) => {
  try {
    const { Localisation, email, password, idAdmin } = req.body;
    const newAgence = await Agence.create({ Localisation, email, password, idAdmin });
    const templatePath = path.join(__dirname, '../templates/email-template.html');
    let htmlContent = fs.readFileSync(templatePath, 'utf8');

    // Remplacez les variables dans le modèle HTML
    htmlContent = htmlContent.replace('${Localisation}', Localisation)
                             .replace('${email}', email)
                             .replace('${idAdmin}', idAdmin);

    // Configuration de l'email
    const mailOptions = {
      from: '"Emploi Pour Tous" <your-email@example.com>', // Adresse email de l'expéditeur
      to: 'recipient@example.com', // Adresse email du destinataire
      subject: 'Nouvelle Agence Créée',
      html: htmlContent,
    };
  
    await transporter.sendMail(mailOptions);
    res.status(201).json(newAgence);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Récupérer toutes les agences
exports.findAll = async (req, res) => {
  try {
    const agences = await Agence.findAll();
    res.status(200).json(agences);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Récupérer une agence par ID
exports.findOne = async (req, res) => {
  try {
    const agence = await Agence.findByPk(req.params.id);
    if (!agence) {
      return res.status(404).json({ error: 'Agence not found' });
    }
    res.status(200).json(agence);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mettre à jour une agence
exports.update = async (req, res) => {
  try {
    const { Localisation, email, password, idAdmin } = req.body;
    const [updated] = await Agence.update({ Localisation, email, password, idAdmin }, {
      where: { idAgence: req.params.id }
    });
    if (!updated) {
      return res.status(404).json({ error: 'Agence not found' });
    }
    const updatedAgence = await Agence.findByPk(req.params.id);
    res.status(200).json(updatedAgence);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer une agence
exports.delete = async (req, res) => {
  try {
    const deleted = await Agence.destroy({
      where: { idAgence: req.params.id }
    });
    if (!deleted) {
      return res.status(404).json({ error: 'Agence not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Vérifier si l'email existe dans la base de données
    const agence = await Agence.findOne({ where: { email } });

    if (!agence) {
      return res.status(404).json({ error: 'Agence non trouvée' });
    }

    // Comparer le mot de passe avec celui stocké dans la base de données (pas de cryptage ici)
    if (password !== agence.password) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    // Créer un jeton JWT pour l'authentification
    const token = jwt.sign(
      { id: agence.id, email: agence.email, idAdmin: agence.idAdmin },
      'votre_clé_secrète', // Remplace cette clé par une clé secrète pour signer le token
      { expiresIn: '1h' }  // Le jeton expire après 1 heure (tu peux ajuster la durée)
    );

    // Répondre avec le token d'authentification
    res.status(200).json({
      message: 'Authentification réussie',
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
