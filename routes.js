const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { ensureAuthenticated, forwardAuthenticated } = require('./config/auth');


// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));


// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
    res.render('dashboard', {
        user: req.user
    })
);

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    const errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {

    }
});

module.exports = router;
