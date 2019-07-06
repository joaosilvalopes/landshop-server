const request = require('supertest');
const { app } = require('../../server');
const globals = require('./globals');

describe('POST /listing', () => {
    it('Should succeed', async () => {
        const data = {
            username: globals.user.username,
            title: 'Test listing',
            description: 'Listing description',
            price: 20,
            currency: 'EUR',
            phone: '+351912345678',
            email: 'um@dois.tres',
            coordinates: [
                {
                    lng: 10,
                    lat: 10,
                },
                {
                    lng: 10,
                    lat: 20,
                },
                {
                    lng: 20,
                    lat: 10,
                },
                {
                    lng: 20,
                    lat: 20,
                },
            ],
        };

        const res = await request(app)
            .post('/listing')
            .set({ authorization: `Bearer ${globals.user.token}` })
            .send(data)
            .expect(200);

        expect(res.body).toMatchObject(data);

        globals.listing = res.body;
    });
});
