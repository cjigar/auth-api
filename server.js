const dotenv = require('dotenv');
const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: env + '.env' });
var config = require('./server/config/config')[env];

const express = require('express');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;


const app = express();

// Log requests to the console.
app.use(logger(env));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
// app.set('view',path.join(__dirname,'views'));


// Connect flash
app.use(flash());

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(expressValidator());

// Passport middleware
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Models
const models = require('./server/models');

// Auth Routes
require('./routes/auth')(app, passport);

// load passport strategies
require('./config/passport.js')(passport, models.user);

// API Routes
// require('./routes/api')(app, passport);


// Check Database connection
if (env == 'development') {
    models.sequelize.sync().then(() => {
        console.log('Database connected succesfully..!');
    }).catch((err) => {
        console.log(err, 'Database connection refuse..!');
    });
}
// Routes
app.use('/api', require('./routes'));

// Default route
app.use((req, res) => {
    res.sendStatus(404);
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = server;
