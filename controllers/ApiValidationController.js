const { check, validationResult } = require('express-validator');

class ApiValidationController {

    static async signin (req, res, next) {

        // email must be an email
        await check('email').isEmail().run(req);

        // password must be at least 5 chars long
        await check('password').isLength({ min: 5 }).run(req);

        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

    }
    static async signup (req, res, next) {

        // name is field is required
        await check('name').not().isEmpty().run(req);
        // email must be an email
        await check('email').isEmail().run(req);
        // password must be at least 5 chars long
        await check('password').isLength({ min: 5 }).run(req);

        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

    }
}

module.exports = ApiValidationController;
