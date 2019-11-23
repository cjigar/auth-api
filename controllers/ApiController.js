// const User = require('../server / models / users');
// Models
const models = require('../server/models');
const passport = require('../config/passport');
class ApiController {

    static getAllUsers (req, res) {

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
            } else {
                throw new Error('Oh, Something went wrong !!');
            }
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(user_list));
        }).catch((err) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ message: err.message }));
        });
    }

    static getOneUser (req, res) {

        const userId = req.params.id;

        models.user.findByPk(userId).then((user) => {
            if (user) {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({
                    id: user.id,
                    name: user.name,
                    email: user.email
                }));
            } else {
                throw new Error('Oh, Something went wrong !!');
            }
        }).catch((err) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ message: err.message }));
        });

    }

    static createUser (req, res) {

        models.user.create({
            name: req.body.name,
            email: req.body.email,
            createdAt: new Date(),
            updatedAt: new Date()
        }).then((user) => {
            if (user) {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({
                    id: user.id,
                    name: user.name,
                    email: user.email
                }));
            } else {
                throw new Error('Oh, Something went wrong !!');
            }
        }).catch((err) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ message: err.message }));
        });
    }

    static updateUser (req, res) {

        const userId = req.params.id;

        models.user.update({
            name: req.body.name,
            email: req.body.email,
            updatedAt: new Date()
        }, {
            returning: true,
            where: {
                id: userId
            }
        }).then(([status, [user]]) => {
            if (status) {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({
                    id: user.id,
                    name: user.name,
                    email: user.email
                }));
            } else {
                throw new Error('Oh, Something went wrong !!');
            }
        }).catch((err) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ message: err.message }));
        });
    }

    static deleteUser (req, res) {
        const userId = req.params.id;
        models.user.destroy({
            where: {
                id: userId
            }
        }).then((users) => {
            res.setHeader('Content-Type', 'application/json');
            if (users) {
                res.send(JSON.stringify({ message: 'Record Successfully Deleted.' }));
            } else {
                throw new Error('Oh, Something went wrong !!');
            }
        }).catch((err) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ message: err.message }));
        });
    }
}
module.exports = ApiController;
