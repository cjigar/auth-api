const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtSecret = require('./jwtConfig');

// Models
const models = require('../server/models');

// load bcrypt
const bcrypt = require('bcryptjs');
const BCRYPT_SALT_ROUNDS = 12;

passport.use(
    'register',
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
        session: false
    }, (req, email, password, done) => {
        try {
            models.user.findOne({
                where: {
                    email
                }
            }).then(user => {
                if (user != null) {
                    return done(null, false, {
                        message: 'username or email already taken'
                    });
                }
                bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
                    models.user.create({
                        email,
                        password: hashedPassword

                    }).then(user => {
                        return done(null, user);
                    });
                });

            });
        } catch (err) {
            return done(err);
        }
    }),
);


passport.use(
    'login',
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false
    }, (email, password, done) => {
        try {
            models.user.findOne({
                where: {
                    email
                }
            }).then(user => {
                if (user === null) {
                    return done(null, false, { message: 'bad username' });
                }
                bcrypt.compare(password, user.password).then(response => {
                    if (response !== true) {
                        return done(null, false, { message: 'passwords do not match' });
                    }
                    return done(null, user);
                });
            });
        } catch (err) {
            done(err);
        }
    }),
);


const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: jwtSecret.secret
};

passport.use(
    'jwt',
    new JwtStrategy(opts, (jwt_payload, done) => {
        try {
            models.user.findOne({
                where: {
                    id: jwt_payload.id
                }
            }).then(user => {
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            });
        } catch (err) {
            done(err);
        }
    }),
);
