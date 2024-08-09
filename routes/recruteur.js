const express = require('express');
const router = express.Router();
const recruteurController = require('../controllers/recruteur');

/**
 * @swagger
 * tags:
 *   name: Recruteurs
 *   description: API for managing recruteurs
 */

/**
 * @swagger
 * /recruteur/create:
 *   post:
 *     summary: Create a new recruteur
 *     tags: [Recruteurs]
 *     description: Create a new recruteur with the provided information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               contact:
 *                 type: integer
 *               email:
 *                 type: string
 *               sujet:
 *                 type: string
 *               localisation:
 *                 type: string
 *               Detail:
 *                 type: string
 *           example:
 *             name: "Nom du recruteur"
 *             contact: 1234567890
 *             email: "recruteur@example.com"
 *             sujet: "Sujet du recruteur"
 *             localisation: "Localisation du recruteur"
 *             Detail: "Détails supplémentaires du recruteur"
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/create', recruteurController.createRecruteur);

/**
 * @swagger
 * /recruteur/list:
 *   get:
 *     summary: Retrieve a list of recruteurs
 *     tags: [Recruteurs]
 *     description: Retrieve a list of recruteurs from the database
 *     responses:
 *       200:
 *         description: A list of recruteurs
 */
router.get('/list', recruteurController.getAllRecruteurs);

/**
 * @swagger
 * /recruteur/{id}:
 *   get:
 *     summary: Retrieve a single recruteur by ID
 *     tags: [Recruteurs]
 *     description: Retrieve a single recruteur from the database by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the recruteur to retrieve
 *     responses:
 *       200:
 *         description: A single recruteur
 *       404:
 *         description: Recruteur not found
 */
router.get('/:id', recruteurController.getRecruteurById);

/**
 * @swagger
 * /recruteur/{id}:
 *   put:
 *     summary: Update a recruteur by ID
 *     tags: [Recruteurs]
 *     description: Update a recruteur with the provided information
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the recruteur to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               contact:
 *                 type: integer
 *               email:
 *                 type: string
 *               sujet:
 *                 type: string
 *               localisation:
 *                 type: string
 *               Detail:
 *                 type: string
 *           example:
 *             name: "Nouveau nom du recruteur"
 *             contact: 987654321
 *             email: "nouveau.recruteur@example.com"
 *             sujet: "Nouveau sujet du recruteur"
 *             localisation: "Nouvelle localisation du recruteur"
 *             Detail: "Nouveaux détails supplémentaires du recruteur"
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Recruteur not found
 */
router.put('/:id', recruteurController.updateRecruteurById);

/**
 * @swagger
 * /recruteur/{id}:
 *   delete:
 *     summary: Delete a recruteur by ID
 *     tags: [Recruteurs]
 *     description: Delete a recruteur from the database by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the recruteur to delete
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: Recruteur not found
 */
router.delete('/:id', recruteurController.deleteRecruteurById);

module.exports = router;
