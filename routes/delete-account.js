const postgres = require('../config/postgres');
const logger = require('../utils/logger');
const emailService = require('../services/emailService');

module.exports = (app) => app.delete('/account', async (req, res) => {
    try {
        await postgres.query(`
            delete from Users
            where username = $1
        `, [req.user.username]);

        await emailService.sendAlertEmail(req.user.email, {
            title: 'Account Deletion',
            content: 'Your account has just been deleted.',
        });

        return res.send();
    } catch (error) {
        logger.log(error);
        return res.status(400).send();
    }
});
