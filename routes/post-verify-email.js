const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

module.exports = (app, connection) => app.post('/verify-email', async (req, res) => {
    const { token } = req.body;

    try {
        const { username } = jwt.verify(token, process.env.JWT_SECRET);

        await connection.query(`
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
