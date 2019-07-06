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

        const newUser = {
            ...user,
            email,
            verified: false,
        };

        const token = jwt.sign(newUser, process.env.JWT_SECRET);

        newUser.token = token;

        await emailService.sendVerificationEmail(email, token);

        return res.json({
            user: newUser,
        });
    } catch (error) {
        logger.log(error);
        return res.status(400).send();
    }
});
