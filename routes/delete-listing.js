const postgres = require('../config/postgres');
const logger = require('../utils/logger');
const emailService = require('../services/emailService');

module.exports = (app) => app.delete('/listing/:slug', async (req, res) => {
    try {
        const result = await postgres.query(`
            delete from Listings
            where slug = $1 and user_id = (select id from Users where username = $2)
            returning title
        `, [req.params.slug, req.user.username]);

        if (result.rows.length < 1) {
            return res.status(403).send();
        }

        const { title } = result.rows[0];

        await emailService.sendAlertEmail(req.user.email, {
            title: 'Listing Deletion',
            content: `Your listing ${title} has just been deleted.`,
        });

        return res.send();
    } catch (error) {
        logger.log(error);
        return res.status(400).send();
    }
});
