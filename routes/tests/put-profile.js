const request = require('supertest');
const { app } = require('../../server');
const globals = require('./globals');

describe('PUT /profile', () => {
    it('Should send 400 if phone is invalid', async () => {
        await request(app)
            .put('/profile')
            .set({ authorization: `Bearer ${globals.users.user1.token}` })
            .send({
                firstName: 'John',
                lastName: 'Doe',
                bio: 'Bio goes here...',
                phone: '123',
            })
            .expect(400);
    });

    it('Should succeed', async () => {
        const data = {
            firstName: 'John',
            lastName: 'Doe',
            bio: 'Bio goes here...',
            phone: '+351 912 345 678',
        };

        const res = await request(app)
            .put('/profile')
            .set({ authorization: `Bearer ${globals.users.user1.token}` })
            .send(data)
            .expect(200);

        globals.users.user1 = { ...globals.users.user1, ...res.body };
    });
});
