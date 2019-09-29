const dotenv = require('dotenv');
const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: env + '.env' });
module.exports = {
    'development': {
        'username': process.env.DB_USERNAME,
        'password': process.env.DB_PASSWORD,
        'database': process.env.DB_DATBASE,
        'host': process.env.DB_HOSTNAME,
        'dialect': 'postgres'
    },
    'test': {
        'username': 'postgres',
        'password': 'postgres',
        'database': 'api',
        'host': '127.0.0.1',
        'dialect': 'postgres'
    },
    'production': {
        'username': 'postgres',
        'password': 'postgres',
        'database': 'api',
        'host': '127.0.0.1',
        'dialect': 'postgres'
    }
};
