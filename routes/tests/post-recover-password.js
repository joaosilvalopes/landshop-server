const request = require('supertest');
const { app } = require('../../server');
const globals = require('./globals');

describe('POST /recover-password', () => {
    it('Should return 400 if the password is invalid', async () => {
        await request(app)
            .post('/recover-password')
            .set({ authorization: `Bearer ${globals.users.user1.token}` })
            .send({ password: null })
            .expect(400);
    });

    it('Should return 401 if the token is invalid', async () => {
        await request(app)
            .post('/recover-password')
            .set({ authorization: 'Bearer INVALID_TOKEN' })
            .send({ password: 'nicePassword123!!!' })
            .expect(401);
    });

    it('Should succeed', async () => {
        globals.users.user1.password = 'myNewPassword123456!?';

        await request(app)
            .post('/recover-password')
            .set({ authorization: `Bearer ${globals.users.user1.token}` })
            .send({ password: globals.users.user1.password })
            .expect(200);

        globals.users.user1.password = 'myNewPassword123456!?';
    });
});
