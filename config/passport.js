const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtSecret = require('./jwtConfig');

// Models
const models = require('../server/models');

// load bcrypt
const bCrypt = require('bcrypt-nodejs');
const BCRYPT_SALT_ROUNDS = 12;

passport.use(
    'register',
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true,
            session: false
        },
        (req, username, password, done) => {
            console.log(username);
            console.log(req.body.email);

            try {
                models.user.findOne({
                    where: {
                        [models.or]: [
                            {
                                username
                            },
                            { email: req.body.email }
                        ]
                    }
                }).then(user => {
                    if (user != null) {
                        console.log('username or email already taken');
                        return done(null, false, {
                            message: 'username or email already taken'
                        });
                    }
                    bCrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
                        models.user.create({
                            username,
                            password: hashedPassword,
                            email: req.body.email
                        }).then(user => {
                            console.log('user created');
                            return done(null, user);
                        });
                    });
                });
            } catch (err) {
                return done(err);
            }
        },
    ),
);


passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            session: false
        },
        (username, password, done) => {
            try {
                models.user.findOne({
                    where: {
                        username
                    }
                }).then(user => {
                    if (user === null) {
                        return done(null, false, { message: 'bad username' });
                    }
                    bCrypt.compare(password, user.password).then(response => {
                        if (response !== true) {
                            console.log('passwords do not match');
                            return done(null, false, { message: 'passwords do not match' });
                        }
                        console.log('user found & authenticated');
                        return done(null, user);
                    });
                });
            } catch (err) {
                done(err);
            }
        },
    ),
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
                    console.log('User found in db via passport');
                    done(null, user);
                } else {
                    console.log('User not found in db');
                    done(null, false);
                }
            });
        } catch (err) {
            done(err);
        }
    }),
);



// module.exports = function (passport, user) {

//     var User = user;
//     var LocalStrategy = require('passport-local').Strategy;
//     passport.serializeUser((user, done) => {
//         done(null, user.id);
//     });


//     // used to deserialize the user
//     passport.deserializeUser((id, done) => {

//         User.findByPk(id).then((user) => {
//             if (user) {
//                 done(null, user.get());
//             }
//             else {
//                 done(user.errors, null);
//             }
//         }).catch((err) => {
//             console.log('Error: ', err);
//         });

//     });

//     passport.use('local-signup', new LocalStrategy(

//         {
//             usernameField: 'email',
//             passwordField: 'password',
//             passReqToCallback: true // allows us to pass back the entire request to the callback
//         },

//         ((req, email, password, done) => {


//             var generateHash = function (password) {
//                 return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
//             };

//             User.findOne({ where: { email: email } }).then((user) => {

//                 if (user) {
//                     return done(null, false, { message: 'That email is already taken' });
//                 }

//                 else {
//                     var userPassword = generateHash(password);
//                     var data =
//                     {
//                         email: email,
//                         password: userPassword,
//                         name: req.body.name
//                     };


//                     User.create(data).then((newUser, created) => {
//                         if (!newUser) {
//                             return done(null, false);
//                         }

//                         if (newUser) {
//                             return done(null, newUser);

//                         }
//                     });
//                 }
//             });
//         })
//     ));

//     // LOCAL SIGNIN
//     passport.use('local-signin', new LocalStrategy(

//         {

//             // by default, local strategy uses username and password, we will override with email
//             usernameField: 'email',
//             passwordField: 'password',
//             passReqToCallback: true // allows us to pass back the entire request to the callback
//         },

//         ((req, email, password, done) => {

//             var User = user;

//             var isValidPassword = function (userpass, password) {
//                 return bCrypt.compareSync(password, userpass);
//             };

//             User.findOne({ where: { email: email } }).then((user) => {

//                 if (!user) {
//                     return done(null, false, { message: 'Email does not exist' });
//                 }

//                 if (!isValidPassword(user.password, password)) {

//                     return done(null, false, { message: 'Incorrect password.' });

//                 }

//                 var userinfo = user.get();

//                 return done(null, userinfo);

//             }).catch((err) => {

//                 console.log('Error:', err);

//                 return done(null, false, { message: 'Something went wrong with your Signin' });


//             });

//         })
//     ));

// };


