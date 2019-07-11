const request = require('supertest');
const { app } = require('../../server');
const globals = require('./globals');

describe('GET /listings', () => {
    it('Should respond with JSON', async () => {
        await request(app)
            .get('/listings')
            .expect(200, {
                [globals.listings.listing1.slug]: globals.listings.listing1,
                [globals.listings.listing2.slug]: globals.listings.listing2,
            });
    });
});
