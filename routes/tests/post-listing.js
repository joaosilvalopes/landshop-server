const request = require('supertest');
const { app } = require('../../server');
const globals = require('./globals');

describe('POST /listing', () => {
    it('Should succeed', async () => {
        const listing1 = {
            title: 'First Listing',
            description: 'First description goes here...',
            price: 35000,
            currency: 'EUR',
            phone: '+351911111111',
            email: 'listing1@mail.com',
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

        const listing2 = {
            title: 'Second Listing',
            description: 'Second description goes here...',
            price: 53000,
            currency: 'EUR',
            phone: '+351922222222',
            email: 'listing2@mail.com',
            coordinates: [
                {
                    lat: 41.160764,
                    lng: -8.664812,
                },
                {
                    lat: 41.160806,
                    lng: -8.665343,
                },
                {
                    lat: 41.160253,
                    lng: -8.665392,
                },
                {
                    lat: 41.160180,
                    lng: -8.664839,
                },
            ],
        };

        const res1 = await request(app)
            .post('/listing')
            .set({ authorization: `Bearer ${globals.users.user1.token}` })
            .send(listing1)
            .expect(200);

        const res2 = await request(app)
            .post('/listing')
            .set({ authorization: `Bearer ${globals.users.user2.token}` })
            .send(listing2)
            .expect(200);

        expect(res1.body).toMatchObject(listing1);
        expect(res2.body).toMatchObject(listing2);

        globals.listings.listing1 = res1.body;
        globals.listings.listing2 = res2.body;
    });
});
