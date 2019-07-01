const request = require('supertest');
const app = require('../../server');
const globals = require('./globals');

describe('GET /listings', () => {
    it('Should respond with JSON', async () => {
        await request(app)
            .get('/listings')
            .expect(200, {
                [globals.listing.slug]: globals.listing,
            });
    });
});
