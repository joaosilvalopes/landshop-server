const bcrypt = require('bcrypt');
const postgres = require('../config/postgres');
const logger = require('../utils/logger');
const { isValidPassword } = require('../utils/validation');

module.exports = (app) => app.put('/password', async (req, res) => {
    const { user, body } = req;
    const { oldPassword, newPassword } = body;

    try {
        const { rows: [{ password }] } = await postgres.query(`
            select password from Users
            where username = $1
        `, [user.username]);

        if (!await bcrypt.compare(oldPassword, password)) {
            return res.status(401).send({ error: 'Wrong password.' });
        }

        if (newPassword === oldPassword || !isValidPassword(newPassword)) {
            return res.status(400).send();
        }

        const hashedPassword = await bcrypt.hash(newPassword, +process.env.BCRYPT_SALT_ROUNDS);

        await postgres.query(`
            update Users
            set password = $1
            where username = $2
        `, [hashedPassword, user.username]);

        return res.send();
    } catch (error) {
        logger.log(error);
        return res.status(400).send();
    }
});
