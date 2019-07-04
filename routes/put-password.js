const bcrypt = require('bcrypt');
const logger = require('../utils/logger');
const { isValidPassword } = require('../utils/validation');

module.exports = (app, connection) => app.put('/password', async (req, res) => {
    const { user, body } = req;
    const { oldPassword, newPassword } = body;

    try {
        const { rows: [{ password }] } = await connection.query(`
            select password from Users
            where username = $1
        `, [user.username]);

        if (!await bcrypt.compare(oldPassword, password)) {
            return res.status(403).send();
        }

        if (newPassword === oldPassword) {
            return res.status(400).send();
        }

        if (!isValidPassword(newPassword)) {
            return res.status(400).send();
        }

        const hashedPassword = await bcrypt.hash(newPassword, +process.env.SALT_ROUNDS);

        await connection.query(`
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
