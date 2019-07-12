/* eslint-disable global-require */
const nodemailer = require('nodemailer');
require('dotenv').config({ path: `${__dirname}/../.env` });

module.exports = async () => {
    const testAccount = await nodemailer.createTestAccount();

    const nodeMailer = {
        NODEMAILER_HOST: 'smtp.ethereal.email',
        NODEMAILER_PORT: 587,
        NODEMAILER_SECURE: '',
        NODEMAILER_USERNAME: testAccount.user,
        NODEMAILER_PASSWORD: testAccount.pass,
    };

    const postgres = {
        POSTGRES_HOST: 'dumbo.db.elephantsql.com',
        POSTGRES_PORT: 5432,
        POSTGRES_DATABASE: 'uqinwnmg',
        POSTGRES_USERNAME: 'uqinwnmg',
        POSTGRES_PASSWORD: '73OlbynH1zLD9YHV6Vfm_c9k25wVd',
    };

    const cloudinary = {
        CLOUDINARY_NAME: 'dqlewnq6f',
        CLOUDINARY_KEY: 191741522985232,
        CLOUDINARY_SECRET: 'gYcwpbBH7M_G7GjOqR6VLzyg698',
    };

    // override enviroment variables
    process.env = {
        ...process.env,
        ...nodeMailer,
        ...postgres,
        ...cloudinary,
        PORT: 9437,
    };
};
