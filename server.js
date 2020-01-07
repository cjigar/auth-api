const dotenv = require('dotenv');
const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: env + '.env' });
var config = require('./server/config/config')[env];

const express = require('express');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const passport = require('passport');
const helmet = require('helmet');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

// Cors for swagger
app.use(cors());

// Helmet for the security headers
app.use(helmet());

// swagger definition
const swaggerDefinition = {
    info: {
        title: 'Learning work',
        version: '1.0.0',
        description: 'RESTful API using Swagger'
    },
    host: 'localhost:5000',
    basePath: '/',
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            scheme: 'bearer',
            in: 'header'
        }
    }
};

// options for the swagger docs
const options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes.js']
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);
const setupOption = {
    explorer: true
}
// const setupOption = {
//     explorer: true,
//     swaggerOptions: {
//     urls: [
//       {
//         url: 'http://petstore.swagger.io/v2/swagger.json',
//         name: 'Spec1'
//       },
//       {
//         url: 'http://petstore.swagger.io/v2/swagger.json',
//         name: 'Spec2'
//       }
//     ]
//   }
// }

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, setupOption));

// serve swaggger
app.get('/swager.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

require('./config/passport');

// Log requests to the console.
app.use(logger('dev'));

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
// app.use(session({ secret: 'secret', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions

// Global variables
// app.use((req, res, next) => {
//     res.locals.success_msg = req.flash('success_msg');
//     res.locals.error_msg = req.flash('error_msg');
//     res.locals.error = req.flash('error');
//     next();
// });

// Auth Routes
// require('./routes/auth')(app, passport);

// load passport strategies
// require('./config/passport.js')(passport, models.user);

// API Routes
// require('./routes/api')(app, passport);

// Routes
app.use('/api', require('./routes'));

// Default route
app.use((req, res) => {
    res.sendStatus(404);
});

// Models
const models = require('./server/models');

// Check Database connection
if (env == 'development') {
    models.sequelize.sync().then(() => {
        console.log('Database connected succesfully..!');
    }).catch((err) => {
        console.log(err, 'Database connection refuse..!');
    });
}

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = server;
