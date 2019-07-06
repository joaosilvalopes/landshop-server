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

const WEBSITE_NAME = 'Land Marker';
const NO_REPLY_EMAIL = 'no-reply@example.com';

module.exports = {
    sendVerificationEmail: (email, token) => emailService.sendMail({
        from: `"${WEBSITE_NAME}" <${NO_REPLY_EMAIL}>`,
        to: email,
        subject: 'Verify Email',
        html: `
            <h1>Verify Email</h1>
            <p>
                Click
                <a href="https://localhost:3000/verify-email/${token}">
                    this link
                </a>
                to verify your email.
            </p>
        `,
    }),
    sendRecoverPasswordEmail: (email, token) => emailService.sendMail({
        from: `"${WEBSITE_NAME}" <${NO_REPLY_EMAIL}>`,
        to: email,
        subject: 'Recover Password',
        html: `
            <h1>Recover Password</h1>
            <p>
                Click
                <a href="https://localhost:3000/recover-password/${token}">
                    this link
                </a>
                to recover your password.
            </p>
        `,
    }),
};
