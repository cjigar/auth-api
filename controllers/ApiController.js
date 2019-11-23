// const User = require('../server / models / users');
// Models
const models = require('../server/models');
const passport = require('../config/passport');
class ApiController {

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

        console.log('Get One users ---> ', req.params.id);

        const userId = req.params.id;
        models.user.findAll({
            where: {
                id: userId
            }
        }).then((users) => {
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

        console.log('User Inputs are --> ', {
            name: req.body.name,
            email: req.body.email,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        models.user.create({
            name: req.body.name,
            email: req.body.email,
            createdAt: new Date(),
            updatedAt: new Date()
        }).then((user) => {
            const user_list = {
                id: user.id,
                name: user.name,
                email: user.email
            };
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(user_list));
        }).catch((err) => {
            console.log('Error: ', err);
        });
    }

    static updateUser (req, res) {

        const userId = req.params.id;

        console.log('User Inputs are --> ', {
            id: userId,
            name: req.body.name,
            email: req.body.email,
            updatedAt: new Date()
        });

        models.user.update({
            name: req.body.name,
            email: req.body.email,
            updatedAt: new Date()
        },
        { returning: true, where: { id: userId } }
        ).then(([status, [user]]) => {
            let user_list = {};
            if (status) {
                user_list = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                };
            }
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(user_list));
        }).catch((err) => {
            console.log('Error: ', err);
        });
    }

    static deleteUser (req, res) {

        console.log('Get One user id ---> ', req.params.id);

        const userId = req.params.id;
        models.user.destroy({
            where: {
                id: userId
            }
        }).then((users) => {
            const response = {};
            response.status = 'Error';
            response.message = 'Oh, Something went wrong !!';
            if (users) {
                response.status = 'Error';
                response.message = 'Record Successfully Deleted.';
            }
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ user_list }));
        }).catch((err) => {
            console.log('Error: ', err);
        });
    }
}
module.exports = ApiController;
