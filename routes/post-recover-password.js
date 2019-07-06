const bcrypt = require('bcrypt');
const logger = require('../utils/logger');
const emailService = require('../services/emailService');
const { isValidPassword } = require('../utils/validation');

module.exports = (app, connection) => app.post('/recover-password', async (req, res) => {
    const { password } = req.body;

    if (!isValidPassword(password)) {
        return res.status(400).send();
    }

    try {
        const hashedPassword = await bcrypt.hash(password, +process.env.BCRYPT_SALT_ROUNDS);

        await connection.query(`
            update Users
            set password = $1
            where username = $2
        `, [hashedPassword, req.user.username]);

        await emailService.sendAlertEmail(req.user.email, {
            title: 'Password Updated',
            content: 'Your password was changed.',
        });

        return res.status(200).send();
    } catch (error) {
        logger.log(error);
        return res.status(400).send();
    }
});
