/* eslint-disable global-require */
const dbUtils = require('../../db-utils');

describe('Route main test collection', () => {
    beforeAll(async () => {
        await dbUtils.dropTables();
        await dbUtils.createTables();
    });

    require('./post-register.js');
    require('./post-verify-email.js');
    require('./get-listings.js');
    require('./get-user.js');
});
