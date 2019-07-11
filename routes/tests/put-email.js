const request = require('supertest');
const { app } = require('../../server');
const globals = require('./globals');

describe('PUT /email', () => {
    it('Should send 400 if email is invalid', async () => {
        await request(app)
            .put('/email')
            .set({ authorization: `Bearer ${globals.users.user1.token}` })
            .send({ email: 'invalidEmail' })
            .expect(400);
    });

    it('Should succeed', async () => {
        const email = 'user@email.com';

        const res = await request(app)
            .put('/email')
            .set({ authorization: `Bearer ${globals.users.user1.token}` })
            .send({ email })
            .expect(200);

        globals.users.user1 = { ...globals.users.user1, ...res.body };

        await request(app)
            .post('/login')
            .send({
                login: globals.users.user1.email,
                password: globals.users.user1.password,
            })
            .expect(200);
    });
});
