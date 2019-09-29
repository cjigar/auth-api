const dotenv = require('dotenv');
const env = process.env.NODE_ENV || 'test';
dotenv.config({ path: env + '.env' });
module.exports = {
    'development': {
        'username': process.env.DB_USERNAME,
        'password': process.env.DB_PASSWORD,
        'database': process.env.DB_DATBASE,
        'host': process.env.DB_HOSTNAME,
        'dialect': 'postgres',
        'logging': false
    },
    'test': {
        'username': process.env.DB_USERNAME,
        'password': process.env.DB_PASSWORD,
        'database': process.env.DB_DATBASE,
        'host': process.env.DB_HOSTNAME,
        'dialect': 'postgres',
        'logging': false
    },
    'production': {
        'username': process.env.DB_USERNAME,
        'password': process.env.DB_PASSWORD,
        'database': process.env.DB_DATBASE,
        'host': process.env.DB_HOSTNAME,
        'dialect': 'postgres',
        'logging': false
    }
};
