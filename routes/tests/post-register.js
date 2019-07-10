const request = require('supertest');
const { app } = require('../../server');
const globals = require('./globals');

describe('POST /register', () => {
    it('Should fail if password is invalid', async () => {
        await request(app)
            .post('/register')
            .send({
                username: 'firstuser',
                email: 'firstuser@mail.com',
                password: 'short',
            })
            .expect(400);
    });

    it('Should fail if username is invalid', async () => {
        await request(app)
            .post('/register')
            .send({
                username: 'use',
                email: 'firstuser@mail.com',
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
        globals.users.user1 = {
            username: 'firstuser',
            email: 'firstuser@mail.com',
            password: 'password1234567890',
        };

        globals.users.user2 = {
            username: 'seconduser',
            email: 'seconduser@mail.com',
            password: 'password1234567890',
        };

        await request(app)
            .post('/register')
            .send(globals.users.user1)
            .expect(200);

        await request(app)
            .post('/register')
            .send(globals.users.user2)
            .expect(200);
    });

    it('Should fail if username is taken', async () => {
        await request(app)
            .post('/register')
            .send({
                username: 'firstuser',
                email: 'firstusernew@mail.com',
                password: 'password1234567890',
            })
            .expect(400, {
                error: 'A user with this username is already registered.',
            });
    });

    it('Should fail if email is taken', async () => {
        await request(app)
            .post('/register')
            .send({
                username: 'firstusernew',
                email: 'firstuser@mail.com',
                password: 'password1234567890',
            })
            .expect(400, {
                error: 'A user with this email is already registered.',
            });
    });
});
