module.exports = function (sequelize, Sequelize) {
    var User = sequelize.define('user', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING
    });
    return User;
};

