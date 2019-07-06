const fs = require('fs');
const path = require('path');
const postgres = require('../config/postgres');
const logger = require('../utils/logger');

const runSql = async (filePath) => {
    const sql = fs.readFileSync(filePath).toString();

    try {
        await postgres.query(sql);
    } catch (error) {
        logger.log(error);
    }
};

module.exports = {
    dropTables: () => runSql(path.join(__dirname, 'drop-tables.sql')),
    createTables: () => runSql(path.join(__dirname, 'create-tables.sql')),
    insertData: () => runSql(path.join(__dirname, 'insert-data.sql')),
};
