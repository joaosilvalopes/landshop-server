/* eslint-disable global-require */
const dbUtils = require('../../db-utils');
const { closeServer } = require('../../server');

describe('Route main test collection', () => {
    beforeAll(async () => {
        await dbUtils.dropTables();
        await dbUtils.createTables();
    });

    afterAll(closeServer);

    require('./post-register.js');
    require('./post-verify-email.js');
    require('./post-login.js');
    require('./get-user.js');
    require('./post-listing.js');
    require('./get-listing.js');
    require('./get-listings.js');
});
