/* eslint-disable no-undef */
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../server');
const dbUtils = require('../../db-utils');

describe('POST /verify-email', () => {
    beforeAll(async () => {
        await dbUtils.dropTables();
        await dbUtils.createTables();
    });

    it('Should fail if token is invalid', async () => {
        await request(app)
            .post('/verify-email')
            .send({ token: 'someinvalidtoken' })
            .expect(400);
    });

    it('Should succeed', async () => {
        const credentials = {
            username: 'userTest',
            email: 'user@mail.com',
            password: '123456',
        };

        await request(app)
            .post('/register')
            .send(credentials);

        const token = jwt.sign({ username: credentials.username }, process.env.JWT_SECRET);

        await request(app)
            .post('/verify-email')
            .send({ token })
            .expect(200);
    });
});
