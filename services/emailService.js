const nodeMailer = require('nodemailer');

const {
    NODEMAILER_HOST,
    NODEMAILER_PORT,
    NODEMAILER_SECURE,
    NODEMAILER_USERNAME,
    NODEMAILER_PASSWORD,
} = process.env;

const emailService = nodeMailer.createTransport({
    host: NODEMAILER_HOST,
    port: NODEMAILER_PORT,
    secure: NODEMAILER_SECURE,
    auth: {
        user: NODEMAILER_USERNAME,
        pass: NODEMAILER_PASSWORD,
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
