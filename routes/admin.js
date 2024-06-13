const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The admin's email.
 *         password:
 *           type: string
 *           description: The admin's password.
 *       example:
 *         email: admin@example.com
 *         password: secretpassword
 */

/**
 * @swagger
 * /admin/create:
 *   post:
 *     summary: Create a new admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       201:
 *         description: Admin created successfully.
 *       500:
 *         description: Error creating admin.
 */
router.post('/create', adminController.createAdmin);

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Login as admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       200:
 *         description: Login successful.
 *       401:
 *         description: Email or password incorrect.
 *       500:
 *         description: Error during login.
 */
router.post('/login', adminController.loginAdmin);

/**
 * @swagger
 * /admin:
 *   get:
 *     summary: Get all admins
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Successfully retrieved list of admins.
 *       500:
 *         description: Error retrieving admins.
 */
router.get('/', adminController.getAllAdmins);

/**
 * @swagger
 * /admin/{id}:
 *   get:
 *     summary: Get admin by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The admin ID
 *     responses:
 *       200:
 *         description: Successfully retrieved admin.
 *       404:
 *         description: Admin not found.
 *       500:
 *         description: Error retrieving admin.
 */
router.get('/:id', adminController.getAdminById);

/**
 * @swagger
 * /admin/{id}:
 *   put:
 *     summary: Update admin by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The admin ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       200:
 *         description: Successfully updated admin.
 *       404:
 *         description: Admin not found.
 *       500:
 *         description: Error updating admin.
 */
router.put('/:id', adminController.updateAdminById);

/**
 * @swagger
 * /admin/{id}:
 *   delete:
 *     summary: Delete admin by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The admin ID
 *     responses:
 *       200:
 *         description: Successfully deleted admin.
 *       404:
 *         description: Admin not found.
 *       500:
 *         description: Error deleting admin.
 */
router.delete('/:id', adminController.deleteAdminById);

module.exports = router;
