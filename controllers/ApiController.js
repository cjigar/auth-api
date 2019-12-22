// const User = require('../server / models / users');
// Models
const models = require('../server/models');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const jwtSecret = require('../config/jwtConfig');


class ApiController {

    static userRegister (req, res) {
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

                    const data = {
                        name: req.body.name,
                        email: req.body.email
                    };

                    models.user.findOne({
                        where: {
                            email: data.email
                        }
                    }).then(user => {
                        user
                            .update({
                                name: data.name,
                                createdAt: new Date(),
                                updatedAt: new Date()
                            })
                            .then(() => {
                                res.status(200).send({ message: 'User created' });
                            });
                    });
                });
            }
        })(req, res);
    }


    static auth (req, res) {

        passport.authenticate('login', (err, user, info) => {
            if (err) {
                console.error(`error ${err}`);
            }
            if (info !== undefined) {
                console.error(info);
                if (info.message === 'Bad username') {
                    res.status(401).send({ info });
                } else {
                    res.status(403).send({ info });
                }
            } else {

                req.logIn(user, () => {

                    models.user.findOne({
                        where: {
                            email: req.body.email
                        }
                    }).then(user => {
                        const token = jwt.sign({ id: user.id }, jwtSecret.secret, {
                            expiresIn: 60 * 60
                        });
                        res.status(200).send({
                            auth: true,
                            token,
                            data: user,
                            message: 'User found & logged in'
                        });
                    });
                });
            }
        })(req, res);
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
            res.status(200).send(user_list);
        }).catch((err) => {
            res.status(404).send({ message: err.message });
        });
    }

    static getOneUser (req, res) {

        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.log(err);
            }

            if (info !== undefined) {
                res.status(401).send(info.message);
            } else if (user.id === req.query.id) {
                models.user.findOne({
                    where: {
                        id: req.query.id
                    }
                }).then((userInfo) => {
                    if (userInfo != null) {
                        res.status(200).send({
                            auth: true,
                            id: userInfo.id,
                            name: userInfo.name,
                            email: userInfo.email,
                            message: 'user found in db'
                        });
                    } else {
                        res.status(401).send('No user exists in db with requested id.');
                    }
                });
            } else {
                res.status(403).send('Requested id and jwt token do not match');
            }
        })(req, res);
    }

    static updateUser (req, res) {

        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.error(err);
            }
            if (info !== undefined) {
                console.error(info.message);
                res.status(403).send(info.message);
            } else {
                models.user.findOne({
                    where: {
                        email: req.body.email
                    }
                }).then((userInfo) => {
                    if (userInfo != null) {
                        userInfo
                            .update({
                                name: req.body.name,
                                email: req.body.email
                            })
                            .then(() => {
                                res.status(200).send({ auth: true, message: 'User updated' });
                            });
                    } else {
                        res.status(401).send('No user exists in db to update');
                    }
                });
            }
        })(req, res);
    }

    static deleteUser (req, res) {

        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.error(err);
            }
            if (info !== undefined) {
                console.error(info.message);
                res.status(403).send(info.message);
            } else if (user.id === req.query.id) {
                models.user.destroy({
                    where: {
                        id: req.query.id
                    }
                }).then((userInfo) => {
                    if (userInfo === 1) {
                        res.status(200).send('User deleted from db');
                    } else {
                        res.status(404).send('No user with requested id to delete');
                    }
                }).catch((error) => {
                    res.status(500).send(error);
                });
            } else {
                res.status(403).send('Request id and jwt token do not match');
            }
        })(req, res);
    }

}

module.exports = ApiController;
