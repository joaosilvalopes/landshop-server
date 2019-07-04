const request = require('supertest');
const { app } = require('../../server');
const globals = require('./globals');

describe('POST /login', () => {
    it('Should fail if there is no registered user', async () => {
        await request(app)
            .post('/login')
            .send({
                login: 'unknownUser',
                password: globals.user.password,
            })
            .expect(400);
    });

    it('Should fail if password is wrong', async () => {
        await request(app)
            .post('/login')
            .send({
                login: globals.user.username,
                password: 'wrongPassword12345',
            })
            .expect(400);
    });

    it('Should work with username', async () => {
        await request(app)
            .post('/login')
            .send({
                login: globals.user.username,
                password: globals.user.password,
            })
            .expect(200);
    });

    it('Should work with email', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                login: globals.user.email,
                password: globals.user.password,
            })
            .expect(200);

        globals.user.token = res.body.token;
    });
});
