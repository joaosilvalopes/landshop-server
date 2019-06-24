/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server');
const dbUtils = require('../db-utils');

describe('POST /register', () => {
    beforeAll(async () => {
        await dbUtils.dropTables();
        await dbUtils.createTables();
    });

    it('Should fail if password is invalid', async () => {
        await request(app)
            .post('/register')
            .send({
                username: 'userTest',
                email: 'user@mail.com',
                password: '12345',
            })
            .expect(400);
    });

    it('Should fail if username is invalid', async () => {
        await request(app)
            .post('/register')
            .send({
                username: 'user',
                email: 'user@mail.com',
                password: '123456',
            })
            .expect(400);
    });

    it('Should fail if email is invalid', async () => {
        await request(app)
            .post('/register')
            .send({
                username: 'user',
                email: '',
                password: '12345',
            })
            .expect(400);
    });

    it('Should succeed', async () => {
        await request(app)
            .post('/register')
            .send({
                username: 'userTest',
                email: 'user@mail.com',
                password: '123456',
            })
            .expect(200);
    });

    it('Should fail if username is taken', async () => {
        await request(app)
            .post('/register')
            .send({
                username: 'userTest',
                email: 'user@mail1.com',
                password: '123456',
            })
            .expect(400, {
                message: 'A user with this username is already registered',
            });
    });

    it('Should fail if email is taken', async () => {
        await request(app)
            .post('/register')
            .send({
                username: 'userTest1',
                email: 'user@mail.com',
                password: '123456',
            })
            .expect(400, {
                message: 'A user with this email is already registered',
            });
    });
});
