const request = require('supertest');
const { app } = require('../../server');
const globals = require('./globals');
const { signToken } = require('../../utils/authToken');

describe('POST /verify-email', () => {
    it('Should fail if token is invalid', async () => {
        await request(app)
            .post('/verify-email')
            .send({ token: 'someinvalidtoken' })
            .expect(400);
    });

    it('Should succeed', async () => {
        const token = signToken(globals.users.user1);

        await request(app)
            .post('/verify-email')
            .send({ token })
            .expect(200);
    });
});
