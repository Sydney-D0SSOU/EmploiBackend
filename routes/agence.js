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

module.exports = router;
