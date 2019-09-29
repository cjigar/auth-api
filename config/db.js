const dotenv = require('dotenv');
const env = process.env.NODE_ENV || 'dev';
dotenv.load({ path: env + '.env' });

module.exports = {
    'dev': {
        // DEVELOPMENT
        'host': process.env.DB_HOSTNAME,
        'database': process.env.DB_DATBASE,
        'username': process.env.DB_USERNAME,
        'password': process.env.DB_PASSWORD,
        'dialect': 'postgres',
        'logging': true

    },
    'prod': {
        // PRODUCTION
        'host': process.env.DB_HOSTNAME,
        'database': process.env.DB_NAME,
        'username': process.env.DB_USERNAME,
        'password': process.env.DB_PASSWORD,
        'dialect': 'postgres',
        'logging': false

    }
}

