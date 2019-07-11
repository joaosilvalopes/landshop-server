const request = require('supertest');
const { app } = require('../../server');
const globals = require('./globals');

describe('PUT /profile-picture', () => {
    it('Should send 400 no picture is send', async () => {
        await request(app)
            .put('/profile-picture')
            .set({ authorization: `Bearer ${globals.users.user1.token}` })
            .set({ 'Content-Type': 'multipart/form-data' })
            .expect(400);
    });

    it('Should succeed', async () => {
        const res = await request(app)
            .put('/profile-picture')
            .set({ authorization: `Bearer ${globals.users.user1.token}` })
            .set({ 'Content-Type': 'multipart/form-data' })
            .attach('profilePicture', 'routes/tests/media/image.png')
            .expect(200);

        globals.users.user1 = { ...globals.users.user1, ...res.body };
    });
});
