const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const get = require('lodash/get');
const logger = require('../utils/logger');
const {
    isValidUsername,
    isValidEmail,
    isValidPassword,
} = require('../utils/validation');

module.exports = (app, connection) => app.post('/login', async (req, res) => {
    const { login, password } = req.body;

    const isEmail = isValidEmail(login);

    if ((!isEmail && !isValidUsername(login)) || !isValidPassword(password)) {
        return res.status(400).send();
    }

    try {
        const result = await connection.query(`
            select
                username,
                email,
                password,
                verified,
                bio,
                phone
            from Users
            where ${isEmail ? 'email' : 'username'} = $1
        `, [login]);

        const user = get(result, 'rows.0');

        if (!user) {
            return res.status(400).json({ error: 'User doesn\'t exist.' });
        }

        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).json({ error: 'Wrong password.' });
        }

        delete user.password;

        const token = await jwt.sign(user, process.env.JWT_SECRET);

        return res.json({
            ...user,
            token,
        });
    } catch (error) {
        logger.log(error);
        return res.status(400).send();
    }
});
