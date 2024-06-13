const Candidat = require('../models/candidat'); // Assurez-vous que le chemin est correct

// CRUD operations

// Create Candidat
exports.createCandidat = async (req, res) => {
  try {
    const candidat = await Candidat.create({
      nom: req.body.nom,
      prenom: req.body.prenom,
      datenaiss: req.body.datenaiss,
      email: req.body.email,
      phone: req.body.phone,
      jourdispo: req.body.jourdispo,
      cv: req.body.cv
    });

    return res.status(201).json(candidat);
  } catch (error) {
    return res.status(400).json({ error: error.message });
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
  