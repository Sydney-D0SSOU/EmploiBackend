const  Recruteur  = require('../models/recruteur');
const transporter = require('../config/mailer');
const path = require('path');
const fs = require('fs');
const templatePath = path.join(__dirname, '../templates/recruteur-email-template.html');
const emailTemplate = fs.readFileSync(templatePath, 'utf8');
// Create Recruteur
exports.createRecruteur = async (req, res) => {
    try {
        const { name, contact, email, sujet, localisation, Detail } = req.body;

        // Vérifier si tous les champs requis sont fournis
        if (!name || !contact || !email || !sujet || !localisation || !Detail) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const recruteur = await Recruteur.create({
            name,
            contact,
            email,
            sujet,
            localisation,
            Detail
        });
        const emailContent = emailTemplate
        .replace('${name}', name)
        .replace('${contact}', contact)
        .replace('${email}', email)
        .replace('${sujet}', sujet)
        .replace('${localisation}', localisation)
        .replace('${Detail}', Detail)
    
        const mailOptions = {
          from: 'service@emploipourtous.africa',
          to: req.body.email,
          subject: 'Confirmation de demande de recrutement',
          html: emailContent
        };
       ;
      
        await transporter.sendMail(mailOptions);
        return res.status(201).json(recruteur);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};


// Get all Recruteurs
exports.getAllRecruteurs = async (req, res) => {
    try {
        const recruteurs = await Recruteur.findAll();
        return res.status(200).json(recruteurs);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Get Recruteur by ID
exports.getRecruteurById = async (req, res) => {
    try {
        const recruteur = await Recruteur.findByPk(req.params.id);
        if (!recruteur) {
            return res.status(404).json({ error: 'Recruteur not found' });
        }
        return res.status(200).json(recruteur);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Update Recruteur by ID
exports.updateRecruteurById = async (req, res) => {
    try {
        const recruteur = await Recruteur.findByPk(req.params.id);
        if (!recruteur) {
            return res.status(404).json({ error: 'Recruteur not found' });
        }
        await recruteur.update(req.body);
        return res.status(200).json(recruteur);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Delete Recruteur by ID
exports.deleteRecruteurById = async (req, res) => {
    try {
        const recruteur = await Recruteur.findByPk(req.params.id);
        if (!recruteur) {
            return res.status(404).json({ error: 'Recruteur not found' });
        }
        await recruteur.destroy();
        return res.status(204).end();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
