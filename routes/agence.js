const express = require('express');
const router = express.Router();
const agenceController = require('../controllers/agence');

/**
 * @swagger
 * components:
 *   schemas:
 *     Agence:
 *       type: object
 *       required:
 *         - Localisation
 *         - email
 *         - password
 *         - idAdmin
 *       properties:
 *         idAgence:
 *           type: integer
 *           description: The auto-generated ID of the Agence
 *         Localisation:
 *           type: string
 *           description: The location of the Agence
 *         email:
 *           type: string
 *           description: The email of the Agence
 *         password:
 *           type: string
 *           description: The password of the Agence
 *         idAdmin:
 *           type: integer
 *           description: The ID of the associated Admin
 *       example:
 *         Localisation: "123 Main St"
 *         email: "example@domain.com"
 *         password: "password123"
 *         idAdmin: 1
 */

/**
 * @swagger
 * tags:
 *   name: Agences
 *   description: The Agences managing API
 */

/**
 * @swagger
 * /agence/create:
 *   post:
 *     summary: Create a new Agence
 *     tags: [Agences]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agence'
 *     responses:
 *       201:
 *         description: The Agence was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agence'
 *       400:
 *         description: Bad request
 */
router.post('/create', agenceController.create);

/**
 * @swagger
 * /agence/list:
 *   get:
 *     summary: Returns the list of all the Agences
 *     tags: [Agences]
 *     responses:
 *       200:
 *         description: The list of the Agences
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agence'
 */
router.get('/list', agenceController.findAll);

/**
 * @swagger
 * /agence/{id}:
 *   get:
 *     summary: Get the Agence by id
 *     tags: [Agences]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Agence id
 *     responses:
 *       200:
 *         description: The Agence description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agence'
 *       404:
 *         description: The Agence was not found
 */
router.get('/:id', agenceController.findOne);

/**
 * @swagger
 * /agence/{id}:
 *   put:
 *     summary: Update the Agence by the id
 *     tags: [Agences]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Agence id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agence'
 *     responses:
 *       200:
 *         description: The Agence was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agence'
 *       404:
 *         description: The Agence was not found
 *       400:
 *         description: Bad request
 */
router.put('/:id', agenceController.update);

/**
 * @swagger
 * /agence/{id}:
 *   delete:
 *     summary: Remove the Agence by id
 *     tags: [Agences]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Agence id
 *     responses:
 *       204:
 *         description: The Agence was deleted
 *       404:
 *         description: The Agence was not found
 */
router.delete('/:id', agenceController.delete);
/**
 * @swagger
 * /agence/login:
 *   post:
 *     summary: Authentifier une agence
 *     description: Cette route permet à une agence de se connecter en utilisant son email et son mot de passe. Si les informations sont correctes, un token JWT sera renvoyé pour authentifier l'utilisateur lors des requêtes futures.
 *     tags:
 *       - Agence
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'email de l'agence.
 *                 example: "agence@example.com"
 *               password:
 *                 type: string
 *                 description: Le mot de passe de l'agence.
 *                 example: "motdepasse123"
 *     responses:
 *       200:
 *         description: Authentification réussie. Un jeton JWT est renvoyé.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Authentification réussie"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZ2VuY2VAY29tLmNvbSIsImlkQWRtaW4iOjEsImlhdCI6MTYxNjYzMzA0MywiZXhwIjoxNjE2NjY2NjQzfQ.d-JY24Wp5cKKgVJYduFezwWkX0I3g9Cn7hUazT3xgAk"
 *       400:
 *         description: Mauvaise demande. Les champs requis manquent ou sont mal formatés.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Les champs email et mot de passe sont requis"
 *       401:
 *         description: Échec de l'authentification. Mot de passe incorrect ou agence non trouvée.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Mot de passe incorrect"
 *       500:
 *         description: Erreur interne du serveur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erreur interne du serveur"
 */
router.post('/login', agenceController.login);


module.exports = router;
