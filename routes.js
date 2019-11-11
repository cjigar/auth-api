const express = require('express');
const router = express.Router();
const apiController = require('./controllers/ApiController');
const apiValidationController = require('./controllers/ApiValidationController');

// Check API
router.get('/apiCheck', apiController.apiCheck);

// Signin Page
router.post('/signin', apiValidationController.signin, apiController.signin);

// Signup Page
router.post('/signup', apiValidationController.signup, apiController.signup);


// Signup Page
router.get('/getusers', apiController.getAllUsers);

router.get('/getusers', apiController.createUser);
module.exports = router;
