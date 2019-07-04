const request = require('supertest');
const { app } = require('../../server');
const globals = require('./globals');

describe('GET /listing/:slug', () => {
    it('Should respond with JSON', async () => {
        await request(app)
            .get('/listing/test-listing-1')
            .expect(200, globals.listing);
    });
});
