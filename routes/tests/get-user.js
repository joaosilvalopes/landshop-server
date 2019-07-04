const request = require('supertest');
const { app } = require('../../server');
const globals = require('./globals');

describe('GET /user/:username', () => {
    it('Should respond with JSON', async () => {
        await request(app)
            .get(`/user/${globals.user.username}`)
            .expect(200)
            .expect('Content-Type', /json/);
    });
});
