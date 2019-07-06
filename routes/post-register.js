const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const postgres = require('../config/postgres');
const logger = require('../utils/logger');
const emailService = require('../services/emailService');
const {
    isValidUsername,
    isValidEmail,
    isValidPassword,
} = require('../utils/validation');

const messagePerConstraint = {
    users_email_key: 'A user with this email is already registered.',
    users_username_key: 'A user with this username is already registered.',
};

module.exports = (app) => app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    if (!isValidUsername(username) || !isValidPassword(password) || !isValidEmail(email)) {
        return res.status(400).send();
    }

    try {
        const hashedPassword = await bcrypt.hash(password, +process.env.BCRYPT_SALT_ROUNDS);

        await postgres.query(`
            insert into Users(username, email, password)
            values($1, $2, $3)
        `, [username, email, hashedPassword]);

        const token = jwt.sign({
            email,
            username,
            verified: false,
        }, process.env.JWT_SECRET);

        await emailService.sendVerificationEmail(email, token);

        return res.json({
            email,
            username,
            verified: false,
            token,
        });
    } catch (error) {
        if (messagePerConstraint[error.constraint]) {
            return res.status(400).json({ error: messagePerConstraint[error.constraint] });
        }
        logger.log(error);
        return res.status(400).send();
    }
});
