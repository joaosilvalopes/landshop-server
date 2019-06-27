const pg = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const logger = require('../utils/logger');

const runSql = async (filePath) => {
    const client = new pg.Client();

    await client.connect();

    const sql = fs.readFileSync(filePath).toString();

    try {
        await client.query(sql);
    } catch (error) {
        logger.log(error);
    }

    await client.end();
};

module.exports = {
    dropTables: () => runSql(path.join(__dirname, 'drop-tables.sql')),
    createTables: () => runSql(path.join(__dirname, 'create-tables.sql')),
    insertData: () => runSql(path.join(__dirname, 'insert-data.sql')),
};
