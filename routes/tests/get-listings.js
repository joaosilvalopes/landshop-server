const request = require('supertest');
const app = require('../../server');

describe('GET /listings', () => {
    it('Should respond with JSON', async () => {
        await request(app)
            .get('/listings')
            .expect(200)
            .expect('Content-Type', /json/);
    });
});
