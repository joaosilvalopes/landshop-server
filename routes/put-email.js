const jwt = require('jsonwebtoken');
const postgres = require('../config/postgres');
const logger = require('../utils/logger');
const { isValidEmail } = require('../utils/validation');
const emailService = require('../services/emailService');

const messagePerConstraint = {
    users_email_key: 'This email is already in use.',
};

module.exports = (app) => app.put('/email', async (req, res) => {
    const { user, body } = req;
    const { email } = body;

    try {
        if (!isValidEmail(email)) {
            return res.status(400).send();
        }

        await postgres.query(`
            update Users
            set
                email = $1,
                verified = false
            where username = $2
        `, [email, user.username]);

        const newUser = {
            ...user,
            email,
            verified: false,
        };

        const token = jwt.sign(newUser, process.env.JWT_SECRET);

        await emailService.sendVerificationEmail(email, token);

        return res.json({ ...newUser, token });
    } catch (error) {
        if (messagePerConstraint[error.constraint]) {
            return res.status(400).json({ error: messagePerConstraint[error.constraint] });
        }
        logger.log(error);
        return res.status(400).send();
    }
});
