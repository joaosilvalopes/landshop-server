const request = require('supertest');
const { app } = require('../../server');
const globals = require('./globals');

describe('POST /recover-password-email', () => {
    it('Should succeed for known emails', async () => {
        await request(app)
            .post('/recover-password-email')
            .send({ email: globals.users.user1.email })
            .expect(200);
    });

    it('Should not work for unkown emails', async () => {
        await request(app)
            .post('/recover-password-email')
            .send({ email: 'wrongEmail@unkown.com' })
            .expect(400);
    });
});
