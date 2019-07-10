const request = require('supertest');
const { app } = require('../../server');
const globals = require('./globals');

describe('POST /login', () => {
    it('Should fail if there is no registered user', async () => {
        await request(app)
            .post('/login')
            .send({
                login: 'unknownUser',
                password: globals.users.user1.password,
            })
            .expect(400);
    });

    it('Should fail if password is wrong', async () => {
        await request(app)
            .post('/login')
            .send({
                login: globals.users.user1.username,
                password: 'wrongPassword12345',
            })
            .expect(400);
    });

    it('Should work with username', async () => {
        await request(app)
            .post('/login')
            .send({
                login: globals.users.user1.username,
                password: globals.users.user1.password,
            })
            .expect(200);

        await request(app)
            .post('/login')
            .send({
                login: globals.users.user2.username,
                password: globals.users.user2.password,
            })
            .expect(200);
    });

    it('Should work with email', async () => {
        const res1 = await request(app)
            .post('/login')
            .send({
                login: globals.users.user1.email,
                password: globals.users.user1.password,
            })
            .expect(200);

        const res2 = await request(app)
            .post('/login')
            .send({
                login: globals.users.user2.email,
                password: globals.users.user2.password,
            })
            .expect(200);

        globals.users.user1.token = res1.body.token;
        globals.users.user2.token = res2.body.token;
    });
});
