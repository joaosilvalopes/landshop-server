/* eslint-disable no-console */
const fs = require('fs');

module.exports = {
    log: (error) => {
        const timestmap = new Date().toUTCString();
        console.log(timestmap);
        console.log(error);
        fs.appendFileSync(`${__dirname}/../logger.log`, `${timestmap}\n${error}\n\n`, 'utf8');
    },
};
