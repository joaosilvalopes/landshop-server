const bcrypt = require('bcrypt');
const postgres = require('../config/postgres');
const logger = require('../utils/logger');
const {
    isValidUsername,
    isValidEmail,
    isValidPassword,
} = require('../utils/validation');
const { withToken } = require('../utils/authToken');

module.exports = (app) => app.post('/login', async (req, res) => {
    const { login, password } = req.body;

    const isEmail = isValidEmail(login);

    if ((!isEmail && !isValidUsername(login)) || !isValidPassword(password)) {
        return res.status(400).send();
    }

    try {
        const result = await postgres.query(`
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

        if (result.rows.length < 1) {
            return res.status(400).json({ error: 'User doesn\'t exist.' });
        }

        if (!await bcrypt.compare(password, result.rows[0].password)) {
            return res.status(400).json({ error: 'Wrong password.' });
        }

        const user = withToken(result.rows[0]);

        return res.json(user);
    } catch (error) {
        logger.log(error);
        return res.status(400).send();
    }
});
