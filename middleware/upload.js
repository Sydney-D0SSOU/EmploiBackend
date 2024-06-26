const multer = require('multer');
const path = require('path');

// Configuration de multer pour le téléchargement de fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'picture/'); // Dossier de destination pour les images téléchargées
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, file.fieldname + '-' + uniqueSuffix); // Nom de fichier unique
  }
});

// Filtre pour n'accepter que les fichiers avec les extensions spécifiées
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true); // Accepter le fichier
  } else {
    cb(new Error('Only .jpg, .jpeg, .png, and .pdf formats are allowed!'), false); // Rejeter le fichier
  }
};

// Middleware d'upload avec multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = upload;
