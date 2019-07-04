/* eslint-disable global-require */
const nodemailer = require('nodemailer');

module.exports = async () => {
    require('dotenv').config();

    const testAccount = await nodemailer.createTestAccount();

    // override enviroment variables
    process.env = {
        ...process.env,
        NODEMAILER_HOST: 'smtp.ethereal.email',
        NODEMAILER_PORT: 587,
        NODEMAILER_SECURE: '',
        NODEMAILER_USERNAME: testAccount.user,
        NODEMAILER_PASSWORD: testAccount.pass,
    };
};
