/* eslint-disable global-require */
const dbUtils = require('../../db-utils');
const { closeServer } = require('../../server');

describe('Route main test collection', () => {
    beforeAll(async () => {
        await dbUtils.dropTables();
        await dbUtils.createTables();
    });

    afterAll(closeServer);

    require('./post-register');
    require('./get-user');
    require('./post-verify-email');
    require('./post-login');
    require('./put-password');
    require('./post-listing');
    require('./get-listing');
    require('./get-listings');
});
