/* eslint-disable no-console */
const fs = require('fs');

module.exports = {
    log: (error) => {
        const timestmap = new Date().toUTCString();
        if (process.env.NODE_ENV === 'production') {
            console.log(timestmap);
            console.log(error);
        }
        fs.appendFileSync(`${__dirname}/../logger.log`, `${timestmap}\n${JSON.stringify(error)}\n\n`, 'utf8');
    },
};
