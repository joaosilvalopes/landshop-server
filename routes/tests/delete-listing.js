const request = require('supertest');
const { app } = require('../../server');
const globals = require('./globals');

describe('DELETE /listing', () => {
    it('Should send 403 if listing does not exist', async () => {
        await request(app)
            .delete('/listing/someinvalidslug')
            .set({ authorization: `Bearer ${globals.users.user1.token}` })
            .expect(403);
    });

    it('Should send 403 if listing does not belong to logged user', async () => {
        await request(app)
            .delete(`/listing/${globals.listings.listing1.slug}`)
            .set({ authorization: `Bearer ${globals.users.user2.token}` })
            .expect(403);
    });

    it('Should work', async () => {
        await request(app)
            .delete(`/listing/${globals.listings.listing1.slug}`)
            .set({ authorization: `Bearer ${globals.users.user1.token}` })
            .expect(200);

        await request(app)
            .get(`/listing/${globals.listings.listing1.slug}`)
            .expect(404);
    });
});
