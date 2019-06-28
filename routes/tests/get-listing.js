const request = require('supertest');
const app = require('../../server');

describe('GET /listing/:slug', () => {
    it('Should respond with JSON', async () => {
        await request(app)
            .get('/listing/bermuda-triangle')
            .expect(200)
            .expect('Content-Type', /json/);
    });
});
