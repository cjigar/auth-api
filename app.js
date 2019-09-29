// https://github.com/bradtraversy/node_passport_login/blob/master/app.js
// https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8

const express = require('express');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const expressValidator = require('express-validator');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

// Log requests to the console.
app.use(logger('dev'));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// app.set('view',path.join(__dirname,'views'));


// Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Connect flash
app.use(flash());

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(expressValidator());


// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.use('/', require('./routes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
