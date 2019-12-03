const express = require('express');
const router = express.Router();
const apiController = require('./controllers/ApiController');
const apiValidationController = require('./controllers/ApiValidationController');


/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *       email:
 *         type: string
 */
/**
 * @swagger
 * /api/auth:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns user token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: User's email
 *         in: formData
 *         required: true
 *       - name: password
 *         description: User's password
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/User'
 */
// router.get('/users', apiController.authToken);
/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.get('/users', apiController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Users id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User's object
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.get('/users/:id', apiController.getOneUser);

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     description: Creates a new users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: User's name
 *         in: formData
 *         required: true
 *       - name: email
 *         description: User's email
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: User's object
 *         schema:
 *           $ref: '#/definitions/User'
 *
 */
router.post('/users', apiController.createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     description: Updates a single user details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User's id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: name
 *         description: User's name
 *         in: formData
 *         required: true
 *       - name: email
 *         description: User's email
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: User's object
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.put('/users/:id', apiController.updateUser);

/**
 * @swagger
 * /api/Users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     description: Deletes a single user if exists
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User's id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *      '200':
 *        description: A user object.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: Success
 *                name:
 *                  type: string
 *                  example: Jessica Smith
 *      '404':
 *        description: A user with the specified ID was not found.
 *      default:
 *        description: Unexpected error
 */
router.delete('/users/:id', apiController.deleteUser);

module.exports = router;
