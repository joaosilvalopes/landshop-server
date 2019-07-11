const request = require('supertest');
const { app } = require('../../server');
const globals = require('./globals');

const newPassword = 'password12345678901';

describe('PUT /password', () => {
    it('Should send 403 if old password is wrong', async () => {
        await request(app)
            .put('/password')
            .set({ authorization: `Bearer ${globals.users.user1.token}` })
            .send({ oldPassword: 'wrong old password', newPassword })
            .expect(403);
    });

    it('Should send 400 if new password is equal to old password', async () => {
        await request(app)
            .put('/password')
            .set({ authorization: `Bearer ${globals.users.user1.token}` })
            .send({ oldPassword: globals.users.user1.password, newPassword: globals.users.user1.password })
            .expect(400);
    });

    it('Should send 400 if new password is invalid', async () => {
        await request(app)
            .put('/password')
            .set({ authorization: `Bearer ${globals.users.user1.token}` })
            .send({ oldPassword: globals.users.user1.password, newPassword: 'short' })
            .expect(400);
    });

    it('Should change password', async () => {
        await request(app)
            .put('/password')
            .set({ authorization: `Bearer ${globals.users.user1.token}` })
            .send({ oldPassword: globals.users.user1.password, newPassword })
            .expect(200);

        globals.users.user1.password = newPassword;

        await request(app)
            .post('/login')
            .send({
                login: globals.users.user1.username,
                password: globals.users.user1.password,
            })
            .expect(200);
    });
});
