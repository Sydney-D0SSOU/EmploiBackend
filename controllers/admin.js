const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/admin'); // Assurez-vous d'importer correctement le modèle Admin
require('dotenv').config(); // Charger les variables d'environnement à partir du fichier .env



exports.createAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const add = await Admin.create({
            email: email,
            password: hashedPassword
        });
        console.log(add);
        res.status(201).send('Administrateur créé avec succès');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la création de l\'administrateur');
    }
};

exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll();
        res.json(admins);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la récupération des administrateurs');
    }
};

exports.getAdminById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const admin = await Admin.findByPk(id);
        if (!admin) {
            return res.status(404).send('Administrateur introuvable');
        }
        res.json(admin);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la récupération de l\'administrateur');
    }
};

exports.updateAdminById = async (req, res) => {
    const id = parseInt(req.params.id);
    const { email, password } = req.body;

    try {
        const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
        const admin = await Admin.findByPk(id);
        if (!admin) {
            return res.status(404).send('Administrateur introuvable');
        }

        await admin.update({
            email: email,
            password: hashedPassword
        });
        res.json(admin);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la mise à jour de l\'administrateur');
    }
};

exports.deleteAdminById = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const admin = await Admin.findByPk(id);
        if (!admin) {
            return res.status(404).send('Administrateur introuvable');
        }

        await admin.destroy();
        res.json({ message: 'Administrateur supprimé avec succès' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la suppression de l\'administrateur');
    }
};



exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ where: { email } });
        if (!admin) {
            return res.status(404).send('Email ou mot de passe incorrect');
        }

        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) {
            return res.status(401).send('Email ou mot de passe incorrect');
        }

        const payload = {
            id: admin.idAdmin,
            email: admin.email
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Renvoyer le jeton JWT dans la réponse
        res.json([{payload},{ token }]);
    } catch (err) {
        console.error(err);
        // Ne pas renvoyer d'informations sensibles dans les erreurs
        res.status(500).send('Erreur lors de la connexion');
    }
};
