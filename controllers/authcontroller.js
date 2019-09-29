const signup = function (req, res) {
    res.render('signup');
};

const signin = function (req, res) {
    res.render('signin');
};

const dashboard = function (req, res) {
    res.render('dashboard', {
        user: req.user
    });
};

const logout = function (req, res) {
    req.session.destroy((err) => {
        res.redirect('/');
    });
};

module.exports = {
    signup,
    signin,
    dashboard,
    logout
};
