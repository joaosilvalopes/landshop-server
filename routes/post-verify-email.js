const postgres = require('../config/postgres');
const logger = require('../utils/logger');
const { verifyToken } = require('../utils/authToken');

module.exports = (app) => app.post('/verify-email', async (req, res) => {
    const { token } = req.body;

    try {
        const { username } = verifyToken(token);

        await postgres.query(`
            update Users
            set verified = true
            where username = $1
        `, [username]);

        res.send();
    } catch (error) {
        logger.log(error);
        res.status(400).send();
    }
});
