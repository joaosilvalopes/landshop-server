const postgres = require('../config/postgres');
const logger = require('../utils/logger');
const { isValidEmail } = require('../utils/validation');
const { withToken } = require('../utils/authToken');
const emailService = require('../services/emailService');

const messagePerConstraint = {
    users_email_key: 'This email is already in use.',
};

module.exports = (app) => app.put('/email', async (req, res) => {
    const { email } = req.body;

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
        `, [email, req.user.username]);

        const user = withToken({
            ...req.user,
            email,
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
