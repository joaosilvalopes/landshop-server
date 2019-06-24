const jwt = require('jsonwebtoken');

module.exports = (app, connection) => app.post('/verify-email', async (req, res) => {
    const { token } = req.body;

    try {
        const { username } = jwt.verify(token, process.env.JWT_SECRET);

        await connection.query(`
            update users
            set verified = true
            where
                username = $1
        `, [username]);

        res.send();
    } catch (error) {
        res.status(400).send();
    }
});
