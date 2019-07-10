const request = require('supertest');
const jwt = require('jsonwebtoken');
const { app } = require('../../server');
const globals = require('./globals');

describe('PUT /username', () => {
    it('Should send 400 if the username is invalid', async () => {
        await request(app)
            .put('/username')
            .set({ authorization: `Bearer ${globals.user.token}` })
            .send({ username: null })
            .expect(400);
    });

    it('Should succeed', async () => {
        const username = 'mynewusername';

        await request(app)
            .put('/username')
            .set({ authorization: `Bearer ${globals.user.token}` })
            .send({ username })
            .expect(200);

        const token = jwt.sign({
            username,
            email: globals.user.email,
            verified: globals.user.verified,
        }, process.env.JWT_SECRET);

        globals.user.username = username;
        globals.user.token = token;
        globals.listing.username = username;

        await request(app)
            .post('/login')
            .send({
                login: globals.user.username,
                password: globals.user.password,
            })
            .expect(200);
    });
});
