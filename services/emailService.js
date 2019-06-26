const nodeMailer = require('nodemailer');

const emailService = nodeMailer.createTransport({
    host: 'smtp.googlemail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
    },
});

module.exports = {
    sendVerificationEmail: (email, token) => emailService.sendMail({
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
    }),
};
