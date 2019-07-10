const request = require('supertest');
const jwt = require('jsonwebtoken');
const { app } = require('../../server');
const globals = require('./globals');

describe('PUT /email', () => {
    it('Should send 400 if email is invalid', async () => {
        await request(app)
            .put('/email')
            .set({ authorization: `Bearer ${globals.user.token}` })
            .send({ email: 'invalidEmail' })
            .expect(400);
    });

    it('Should succeed', async () => {
        const email = 'user@email.com';

        const res = await request(app)
            .put('/email')
            .set({ authorization: `Bearer ${globals.user.token}` })
            .send({ email })
            .expect(200);

        const token = jwt.sign({
            email,
            username: globals.user.username,
            verified: globals.user.verified,
        }, process.env.JWT_SECRET);

        globals.user.email = email;
        globals.user.token = token;

        await request(app)
            .post('/login')
            .send({
                login: globals.user.email,
                password: globals.user.password,
            })
            .expect(200);
    });
});
