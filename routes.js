const express = require('express');
const router = express.Router();
const apiController = require('./controllers/ApiController');

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
 *       password:
 *          type: string
 */



/**
 * @swagger
 * /api/register:
 *   post:
 *     tags:
 *       - Users
 *     name: Register
 *     summary: Register a new user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           example:
 *               name: Jigar
 *               email: jigar.c@innovify.com
 *               password: jigar
 *         required:
 *           - email
 *           - password
 *     responses:
 *       '200':
 *         description: User created
 *       '403':
 *         description: Username or email already taken
 */

router.post('/register', apiController.userRegister);

/**
 * @swagger
 * /api/auth:
 *   post:
 *     tags:
 *       - Users
 *     summary: Authenticate the user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           example:
 *             email: jigar.c@innovify.com
 *             password: jigar
 *         required:
 *           - email
 *           - password
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.post('/auth', apiController.auth);


/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Return all registered users
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
 * /api/user:
 *   get:
 *     tags:
 *       - Users
 *     summary: Return a login user
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required:
 *           - id
 *     responses:
 *       '200':
 *         description: A single user object
 *         schema:
 *           $ref: '#/definitions/User'
 *       '401':
 *         description: No auth token / no user found in db with that name
 *       '403':
 *         description: JWT token and email from client don't match
 */
router.get('/user', apiController.getOneUser);


/**
 * @swagger
 * /api/user:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update a login user detail
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/User'
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
  *         required:
 *           - email
 *     responses:
 *       '200':
 *         description: User info updated
 *       '403':
 *         description: No authorization / user not found
 */
router.put('/user/:id', apiController.updateUser);

/**
 * @swagger
 * /api/user:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete a user if exists
 *     security:
 *       - bearerAuth: []
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
 *       '200':
 *         description: User deleted from db
 *       '403':
 *         description: Authentication error
 *       '404':
 *         description: No user in db with that name
 *       '500':
 *         description: Problem communicating with db
 */
router.delete('/user', apiController.deleteUser);
module.exports = router;
