const request = require('supertest');
const app = require('../../server');
const globals = require('./globals');

describe('POST /verify-email', () => {
    it('Should fail if password is invalid', async () => {
        await request(app)
            .post('/register')
            .send({
                username: 'userTest',
                email: 'user@mail.com',
                password: 'short',
            })
            .expect(400);
    });

    it('Should fail if username is invalid', async () => {
        await request(app)
            .post('/register')
            .send({
                username: 'use',
                email: 'user@mail.com',
                password: 'password1234567890',
            })
            .expect(400);
    });

    it('Should fail if email is invalid', async () => {
        await request(app)
            .post('/register')
            .send({
                username: 'user',
                email: '',
                password: 'password1234567890',
            })
            .expect(400);
    });

    it('Should succeed', async () => {
        globals.user = {
            username: 'userTest',
            email: 'user@mail.com',
            password: 'password1234567890',
        };

        await request(app)
            .post('/register')
            .send(globals.user)
            .expect(200);
    });

    it('Should fail if username is taken', async () => {
        await request(app)
            .post('/register')
            .send({
                username: 'userTest',
                email: 'user@mail1.com',
                password: 'password1234567890',
            })
            .expect(400, {
                error: 'A user with this username is already registered',
            });
    });

    it('Should fail if email is taken', async () => {
        await request(app)
            .post('/register')
            .send({
                username: 'userTest1',
                email: 'user@mail.com',
                password: 'password1234567890',
            })
            .expect(400, {
                error: 'A user with this email is already registered',
            });
    });
});
