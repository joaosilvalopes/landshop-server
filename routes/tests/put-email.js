const request = require('supertest');
const jwt = require('jsonwebtoken');
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

        await request(app)
            .put('/email')
            .set({ authorization: `Bearer ${globals.users.user1.token}` })
            .send({ email })
            .expect(200);

        const token = jwt.sign({
            email,
            username: globals.users.user1.username,
            verified: globals.users.user1.verified,
        }, process.env.JWT_SECRET);

        globals.users.user1.email = email;
        globals.users.user1.token = token;

        await request(app)
            .post('/login')
            .send({
                login: globals.users.user1.email,
                password: globals.users.user1.password,
            })
            .expect(200);
    });
});
