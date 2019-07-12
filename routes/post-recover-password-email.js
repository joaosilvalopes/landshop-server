const get = require('lodash/get');
const postgres = require('../config/postgres');
const logger = require('../utils/logger');
const emailService = require('../services/emailService');
const { isValidEmail } = require('../utils/validation');
const { signToken } = require('../utils/authToken');

module.exports = (app) => app.post('/recover-password-email', async (req, res) => {
    const { email } = req.body;

    if (!isValidEmail(email)) {
        return res.status(400).send();
    }

    try {
        const result = await postgres.query(`
            select
                username,
                email,
                verified
            from Users
            where email = $1
        `, [email]);

        const user = get(result, 'rows.0');

        if (!user) {
            return res.status(400).json({ error: 'User doesn\'t exist.' });
        }

        const token = signToken(user);

        await emailService.sendRecoverPasswordEmail(email, token);

        return res.status(200).send();
    } catch (error) {
        logger.log(error);
        return res.status(400).send();
    }
});
