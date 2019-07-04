const request = require('supertest');
const { app } = require('../../server');
const globals = require('./globals');

const newPassword = 'password12345678901';

describe('PUT /password', () => {
    it('Should send 403 if old password is wrong', async () => {
        await request(app)
            .put('/password')
            .set({ authorization: `Bearer ${globals.user.token}` })
            .send({ oldPassword: 'wrong old password', newPassword })
            .expect(403);
    });

    it('Should send 400 if new password is equal to old password', async () => {
        await request(app)
            .put('/password')
            .set({ authorization: `Bearer ${globals.user.token}` })
            .send({ oldPassword: globals.user.password, newPassword: globals.user.password })
            .expect(400);
    });

    it('Should send 400 if new password is invalid', async () => {
        await request(app)
            .put('/password')
            .set({ authorization: `Bearer ${globals.user.token}` })
            .send({ oldPassword: globals.user.password, newPassword: 'short' })
            .expect(400);
    });

    it('Should change password', async () => {
        await request(app)
            .put('/password')
            .set({ authorization: `Bearer ${globals.user.token}` })
            .send({ oldPassword: globals.user.password, newPassword })
            .expect(200);

        globals.user.password = newPassword;

        await request(app)
            .post('/login')
            .send({
                login: globals.user.username,
                password: globals.user.password,
            })
            .expect(200);
    });
});
