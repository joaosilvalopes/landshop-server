/* eslint-disable global-require */
const nodemailer = require('nodemailer');
require('dotenv').config({ path: `${__dirname}/../.env` });

module.exports = async () => {
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
