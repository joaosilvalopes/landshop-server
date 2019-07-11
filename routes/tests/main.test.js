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
    require('./post-verify-email');
    require('./post-login');
    require('./post-recover-password-email');
    require('./post-recover-password');
    require('./post-listing');
    require('./put-email');
    require('./put-password');
    require('./put-profile');
    require('./put-username');
    require('./put-profile-picture');
    require('./get-listing');
    require('./get-listings');
    require('./get-user');
    require('./delete-listing');
    require('./delete-account');
});
