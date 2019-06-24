const nodeMailer = require('nodemailer');

module.exports = nodeMailer.createTransport({
    host: 'smtp.googlemail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
    }
});
