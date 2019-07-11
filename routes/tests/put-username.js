const request = require('supertest');
const jwt = require('jsonwebtoken');
const { app } = require('../../server');
const globals = require('./globals');

describe('PUT /username', () => {
    it('Should send 400 if the username is invalid', async () => {
        await request(app)
            .put('/username')
            .set({ authorization: `Bearer ${globals.users.user1.token}` })
            .send({ username: null })
            .expect(400);
    });

    it('Should succeed', async () => {
        const username = 'mynewusername';

        await request(app)
            .put('/username')
            .set({ authorization: `Bearer ${globals.users.user1.token}` })
            .send({ username })
            .expect(200);

        const token = jwt.sign({
            username,
            email: globals.users.user1.email,
            verified: globals.users.user1.verified,
        }, process.env.JWT_SECRET);

        globals.users.user1.username = username;
        globals.users.user1.token = token;
        globals.listings.listing1.username = username;

        await request(app)
            .post('/login')
            .send({
                login: globals.users.user1.username,
                password: globals.users.user1.password,
            })
            .expect(200);
    });
});
