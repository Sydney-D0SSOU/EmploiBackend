const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload'); // Importer le middleware de téléchargement
const candidatController = require('../controllers/candidat');

/**
 * @swagger
 * tags:
 *   name: Candidats
 *   description: API for managing candidats
 */

/**
 * @swagger
 * /candidat/create:
 *   post:
 *     summary: Create a new candidat
 *     tags: [Candidats]
 *     description: Create a new candidat with the provided information
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               datenaiss:
 *                 type: string
 *                 format: date
 *               email:
 *                 type: string
 *               phone:
 *                 type: integer
 *               jourdispo:
 *                 type: string
 *                 format: date
 *               cv:
 *                 type: string
 *                 format: binary
 *               locality:
 *                 type: string
 *           example:   # Fournir un exemple de JSON par défaut
 *             nom: Doe
 *             prenom: John
 *             datenaiss: "1990-05-15"
 *             email: john.doe@example.com
 *             phone: 123456789
 *             jourdispo: "2024-06-10"
 *             localité: "Paris"
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/create', upload.single('cv'), candidatController.createCandidat);

/**
 * @swagger
 * /candidat/list:
 *   get:
 *     summary: Retrieve a list of candidats
 *     tags: [Candidats]
 *     description: Retrieve a list of candidats from the database
 *     responses:
 *       200:
 *         description: A list of candidats
 */
router.get('/list', candidatController.getAllCandidats);

/**
 * @swagger
 * /candidat/{id}:
 *   get:
 *     summary: Retrieve a single candidat by ID
 *     tags: [Candidats]
 *     description: Retrieve a single candidat from the database by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the candidat to retrieve
 *     responses:
 *       200:
 *         description: A single candidat
 *       404:
 *         description: Candidat not found
 */
router.get('/:id', candidatController.getCandidatById);

/**
 * @swagger
 * /candidat/{id}:
 *   put:
 *     summary: Update a candidat by ID
 *     tags: [Candidats]
 *     description: Update a candidat with the provided information
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the candidat to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               datenaiss:
 *                 type: string
 *                 format: date
 *               email:
 *                 type: string
 *               phone:
 *                 type: integer
 *               jourdispo:
 *                 type: string
 *                 format: date
 *               cv:
 *                 type: string
 *               locality:
 *                 type: string
 *           example:   # Fournir un exemple de JSON par défaut
 *             nom: Doe
 *             prenom: John
 *             datenaiss: "1990-05-15"
 *             email: john.doe@example.com
 *             phone: 123456789
 *             jourdispo: "2024-06-10"
 *             locality: "Paris"
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Candidat not found
 */
router.put('/:id', candidatController.updateCandidatById);

/**
 * @swagger
 * /candidat/{id}:
 *   delete:
 *     summary: Delete a candidat by ID
 *     tags: [Candidats]
 *     description: Delete a candidat from the database by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the candidat to delete
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: Candidat not found
 */
router.delete('/:id', candidatController.deleteCandidatById);

module.exports = router;
