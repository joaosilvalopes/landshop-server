const request = require('supertest');
const { app } = require('../../server');
const globals = require('./globals');

describe('GET /listing/:slug', () => {
    it('Should respond with JSON', async () => {
        await request(app)
            .get(`/listing/${globals.listings.listing1.slug}`)
            .expect(200, globals.listings.listing1);

        await request(app)
            .get(`/listing/${globals.listings.listing2.slug}`)
            .expect(200, globals.listings.listing2);
    });
});
