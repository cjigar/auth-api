// const User = require('../server / models / users');
// Models
const models = require('../server/models');
const passport = require('../config/passport');
class ApiController {

    static apiCheck (req, res) {
        res.send('Api is available.');
    }

    static signin (req, res) {

        // Check authentication using database then after allow user to login.
        res.send('Signin');

    }
    static signup (req, res) {


        // Save into the database;
        res.send('Signup');
    }

    static getAllUsers (req, res) {

        console.log('Get all users');

        models.user.findAll({}).then((users) => {
            const user_list = [];
            if (users) {
                users.forEach((user) => {
                    user_list.push({
                        id: user.id,
                        name: user.name,
                        email: user.name
                    });
                });
                console.log(user_list);
            }
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(user_list));
        }).catch((err) => {
            console.log('Error: ', err);
        });

        // Get from users table

    }

    static getOneUser (req, res) {

        console.log('Get all users');

        models.user.findAll({}).then((users) => {
            const user_list = [];
            if (users) {
                users.forEach((user) => {
                    user_list.push({
                        id: user.id,
                        name: user.name,
                        email: user.name
                    });
                });
                console.log(user_list);
            }
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(user_list));
        }).catch((err) => {
            console.log('Error: ', err);
        });

    }
    static updateUser (req, res) {
        models.user.findAll({}).then((users) => {
            const user_list = [];
            if (users) {
                users.forEach((user) => {
                    user_list.push({
                        id: user.id,
                        name: user.name,
                        email: user.name
                    });
                });
                console.log(user_list);
            }
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(user_list));
        }).catch((err) => {
            console.log('Error: ', err);
        });

    }
    static createUser (req, res) {

    }
    static deleteUser (req, res) {

    }
}
module.exports = ApiController;
