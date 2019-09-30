const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Welcome Page
router.get('/api', (req, res) => res.send('welcome'));

// Signin Page
router.post('/api/signin', [
    // email must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 5 })
], (req, res) => {

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    // Check authentication using database then after allow user to login.
    res.send('Signin');
});


// Signup Page
router.post('/api/signup', [
    // name is field is required
    check('name').not().isEmpty(),
    // email must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 5 })
], (req, res) => {

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    // Save into the database;
    res.send('Signup');
});

module.exports = router;
