const Candidat = require('../models/candidat'); // Assurez-vous que le chemin est correct
const { ValidationError } = require('sequelize');
const transporter = require('../config/mailer');
const path = require('path');
const fs = require('fs');
const templatePath = path.join(__dirname, '../templates/email-template.html');
const emailTemplate = fs.readFileSync(templatePath, 'utf-8');
// CRUD operations

// Create Candidat

  exports.createCandidat = async (req, res) => {
    try {
      // Vérifiez si un candidat avec cet email existe déjà
      const existingCandidat = await Candidat.findOne({ where: { email: req.body.email } });
      if (existingCandidat) {
        return res.status(400).send('Email déjà utilisé');
      }

      // Créez un nouveau candidat
      const candidat = await Candidat.create({
        nom: req.body.nom,
        prenom: req.body.prenom, // Assurez-vous que le nom du champ correspond
        datenaiss: req.body.datenaiss,
        email: req.body.email,
        phone: req.body.phone,
        jourdispo: req.body.jourdispo,
        cv: req.file ? req.file.path : null, // Assurez-vous que le nom du champ correspond
        locality: req.body.locality,
      });
       // Remplacer les variables dans le modèle
    const htmlContent = emailTemplate
    .replace('${req.body.prenom}', req.body.prenom)
    .replace('${req.body.nom}', req.body.nom)
    .replace('${req.body.datenaiss}', req.body.datenaiss)
    .replace('${req.body.email}', req.body.email)
    .replace('${req.body.phone}', req.body.phone)
    .replace('${req.body.jourdispo}', req.body.jourdispo)
    .replace('${req.body.locality}', req.body.locality);

  const mailOptions = {
    from: 'service@emploipourtous.africa',
    to: req.body.email,
    subject: 'Confirmation de soumission de candidature',
    html: htmlContent
  };

  await transporter.sendMail(mailOptions);



      return res.status(201).json(candidat);
    } catch (error) {
      if (error instanceof ValidationError) {
        // Gérer les erreurs de validation de Sequelize
        return res.status(400).send('Erreur de validation');
      }

      console.error(error);
      return res.status(500).json({ error: 'Erreur lors de la création du candidat' });
    }
  };

// Get All Candidats
exports.getAllCandidats = async (req, res) => {
  try {
    const candidats = await Candidat.findAll();
    return res.status(200).json(candidats);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get Candidat by ID
exports.getCandidatById = async (req, res) => {
  const { id } = req.params;
  try {
    const candidat = await Candidat.findByPk(id);
    if (!candidat) {
      return res.status(404).json({ message: 'Candidat not found' });
    }
    return res.status(200).json(candidat);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update Candidat by ID
exports.updateCandidatById = async (req, res) => {
  const { id } = req.params;
  try {
    let candidat = await Candidat.findByPk(id);
    if (!candidat) {
      return res.status(404).json({ message: 'Candidat not found' });
    }
    candidat = await candidat.update(req.body);
    return res.status(200).json(candidat);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete Candidat by ID
exports.deleteCandidatById = async (req, res) => {
  const { id } = req.params;
  try {
    const candidat = await Candidat.findByPk(id);
    if (!candidat) {
      return res.status(404).json({ message: 'Candidat not found' });
    }
    await candidat.destroy();
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
