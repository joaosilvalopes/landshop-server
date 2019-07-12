const request = require('supertest');
const { app } = require('../../server');
const globals = require('./globals');

describe('PUT /listing', () => {
    it('Should succeed', async () => {
        const newListing1 = {
            title: 'First Listing (edited)',
            description: 'First description goes here... (edited)',
            price: 36000,
            currency: 'USD',
            phone: '+351912345678',
            email: 'listing1edited@mail.com',
            coordinates: [
                {
                    lat: 25.774,
                    lng: -80.190,
                },
                {
                    lat: 18.466,
                    lng: -66.118,
                },
                {
                    lat: 32.321,
                    lng: -64.757,
                },
            ],
        };

        const res = await request(app)
            .put(`/listing/${globals.listings.listing1.slug}`)
            .set({ authorization: `Bearer ${globals.users.user1.token}` })
            .send(newListing1)
            .expect(200);

        globals.listings.listing1 = res.body;
    });
});
