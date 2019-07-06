const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const { isValidEmail } = require('../utils/validation');
const emailService = require('../services/emailService');

module.exports = (app, connection) => app.put('/email', async (req, res) => {
    const { user, body } = req;
    const { email } = body;

    try {
        if (!isValidEmail(email)) {
            return res.status(400).send();
        }

        await connection.query(`
            update Users
            set
                email = $1,
                verified = false
            where username = $2
        `, [email, user.username]);

        const token = jwt.sign({
            ...user,
            email,
            verified: false,
        }, process.env.JWT_SECRET);

        await emailService.sendVerificationEmail(email, token);

        return res.json({ token });
    } catch (error) {
        logger.log(error);
        return res.status(400).send();
    }
});
