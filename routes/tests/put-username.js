const request = require('supertest');
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
        const res = await request(app)
            .put('/username')
            .set({ authorization: `Bearer ${globals.users.user1.token}` })
            .send({ username: 'mynewusername' })
            .expect(200);

        globals.users.user1 = { ...globals.users.user1, ...res.body };
        globals.listings.listing1.username = globals.users.user1.username;

        await request(app)
            .post('/login')
            .send({
                login: globals.users.user1.username,
                password: globals.users.user1.password,
            })
            .expect(200);
    });
});
