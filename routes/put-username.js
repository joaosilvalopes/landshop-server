const postgres = require('../config/postgres');
const logger = require('../utils/logger');
const { isValidUsername } = require('../utils/validation');
const { withToken } = require('../utils/authToken');

const messagePerConstraint = {
    users_username_key: 'This username is already in use.',
};

module.exports = (app) => app.put('/username', async (req, res) => {
    const { username } = req.body;

    if (!isValidUsername(username)) {
        return res.status(400).send();
    }

    try {
        await postgres.query(`
            update Users
            set username = $1
            where email = $2
        `, [username, req.user.email]);

        const user = withToken({ ...req.user, username });

        return res.json(user);
    } catch (error) {
        if (messagePerConstraint[error.constraint]) {
            return res.status(400).json({ error: messagePerConstraint[error.constraint] });
        }
        logger.log(error);
        return res.status(400).send();
    }
});
