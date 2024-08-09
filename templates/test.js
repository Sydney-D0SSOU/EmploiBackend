const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

// Configurer le transporteur de mail
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Exemple : vous pouvez utiliser Gmail, Outlook, etc.
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

// Lire le modèle d'email
const templatePath = path.join(__dirname, '../templates/recruteur-email-template.html');
const emailTemplate = fs.readFileSync(templatePath, 'utf8');

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

    // Remplacer les variables dans le modèle d'email
    const emailContent = emailTemplate
      .replace('${name}', name)
      .replace('${contact}', contact)
      .replace('${email}', email)
      .replace('${sujet}', sujet)
      .replace('${localisation}', localisation)
      .replace('${Detail}', Detail);

    const mailOptions = {
      from: 'service@emploipourtous.africa',
      to: email,
      subject: 'Confirmation de demande de recrutement',
      html: emailContent
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json(recruteur);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
