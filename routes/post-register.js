const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const emailService = require('../services/emailService');
const {
    isValidUsername,
    isValidEmail,
    isValidPassword,
} = require('../utils/validation');

const messagePerConstraint = {
    users_email_key: 'A user with this email is already registered',
    users_username_key: 'A user with this username is already registered',
};

module.exports = (app, connection) => app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    if (!isValidUsername(username) || !isValidPassword(password) || !isValidEmail(email)) {
        return res.status(400).send();
    }

    try {
        const hashedPassword = await bcrypt.hash(password, +process.env.SALT_ROUNDS);

        await connection.query(`
            insert into users(username, email, password)
            values($1, $2, $3)
            returning id
        `, [username, email, hashedPassword]);

        const token = jwt.sign({ username }, process.env.JWT_SECRET);

        await emailService.sendMail({
            from: '"Land Marker" <land-marker@example.com>',
            to: email,
            subject: 'Account verification',
            html: `
                <h1>Welcome to land marker!</h1>
                <p>
                    press 
                    <a href="https://localhost:3000/verify-email/${token}">
                        this link
                    </a>
                    to verify your account
                </p>
            `,
        });

        return res.send();
    } catch (e) {
        return res.status(400).json({ message: messagePerConstraint[e.constraint] });
    }
});
