// const User = require('../server / models / users');
// Models
const models = require('../server/models');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const jwtSecret = require('../config/jwtConfig');

class ApiController {

    static authToken (req, res) {

        passport.authenticate('login', (err, user, info) => {
            if (err) {
                console.error(`error ${err}`);
            }
            if (info !== undefined) {
                console.error(info.message);
                if (info.message === 'bad username') {
                    res.status(401).send(info.message);
                } else {
                    res.status(403).send(info.message);
                }
            } else {
                req.logIn(users, () => {
                    models.user.findOne({
                        where: {
                            username: req.body.username
                        }
                    }).then(user => {
                        const token = jwt.sign({ id: user.id }, jwtSecret.secret, {
                            expiresIn: 60 * 60
                        });
                        res.status(200).send({
                            auth: true,
                            token,
                            message: 'user found & logged in'
                        });
                    });
                });
            }
        });
    }

    static getUserRegister (req, res) {

        passport.authenticate('register', (err, user, info) => {
            if (err) {
                console.error(err);
            }

            if (info !== undefined) {
                console.error(info.message);
                res.status(403).send(info.message);
            } else {
                // eslint-disable-next-line no-unused-vars
                req.logIn(user, error => {
                    console.log(user);
                    const data = {
                        name: req.body.name,
                        email: req.body.email
                    };
                    console.log(data);
                    models.user.findOne({
                        where: {
                            username: data.username
                        }
                    }).then(user => {
                        console.log(user);
                        user
                            .update({
                                first_name: data.first_name,
                                last_name: data.last_name,
                                email: data.email
                            })
                            .then(() => {
                                console.log('user created in db');
                                res.status(200).send({ message: 'user created' });
                            });
                    });
                });
            }
        });
    }

    static getAllUsers (req, res) {
        models.user.findAll({}).then((users) => {
            const user_list = [];
            if (users) {
                users.forEach((user) => {
                    user_list.push({
                        id: user.id,
                        name: user.name,
                        email: user.email
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

        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.log(err);
            }
            if (info !== undefined) {
                console.log(info.message);
                res.status(401).send(info.message);
            } else if (user.username === req.query.username) {
                models.user.findOne({
                    where: {
                        username: req.query.username
                    }
                }).then((userInfo) => {
                    if (userInfo != null) {
                        console.log('user found in db from findUsers');
                        res.status(200).send({
                            auth: true,
                            id: userInfo.id,
                            name: userInfo.name,
                            email: userInfo.email,
                            message: 'user found in db'
                        });
                    } else {
                        console.error('no user exists in db with that username');
                        res.status(401).send('no user exists in db with that username');
                    }
                });
            } else {
                console.error('jwt id and username do not match');
                res.status(403).send('username and jwt token do not match');
            }
        });


        // const userId = req.params.id;

        // models.user.findByPk(userId).then((user) => {
        //     if (user) {
        //         res.setHeader('Content-Type', 'application/json');
        //         res.send(JSON.stringify({
        //             id: user.id,
        //             name: user.name,
        //             email: user.email
        //         }));
        //     } else {
        //         throw new Error('Oh, Something went wrong !!');
        //     }
        // }).catch((err) => {
        //     res.setHeader('Content-Type', 'application/json');
        //     res.send(JSON.stringify({ message: err.message }));
        // });

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
