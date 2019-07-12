const bcrypt = require('bcrypt');
const postgres = require('../config/postgres');
const logger = require('../utils/logger');
const emailService = require('../services/emailService');
const {
    isValidUsername,
    isValidEmail,
    isValidPassword,
} = require('../utils/validation');
const { withToken } = require('../utils/authToken');

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

        const user = withToken({
            email,
            username,
            verified: false,
        });

        await emailService.sendVerificationEmail(email, user.token);

        return res.json(user);
    } catch (error) {
        if (messagePerConstraint[error.constraint]) {
            return res.status(400).json({ error: messagePerConstraint[error.constraint] });
        }
        logger.log(error);
        return res.status(400).send();
    }
});
