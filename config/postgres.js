const pg = require('pg');
require('dotenv').config({ path: `${__dirname}/../.env` });

const client = new pg.Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
});

client.connect();

module.exports = client;
