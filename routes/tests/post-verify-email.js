const request = require('supertest');
const jwt = require('jsonwebtoken');
const { app } = require('../../server');
const globals = require('./globals');

describe('POST /verify-email', () => {
    it('Should fail if token is invalid', async () => {
        await request(app)
            .post('/verify-email')
            .send({ token: 'someinvalidtoken' })
            .expect(400);
    });

    it('Should succeed', async () => {
        const token = jwt.sign(globals.users.user1, process.env.JWT_SECRET);

        await request(app)
            .post('/verify-email')
            .send({ token })
            .expect(200);
    });
});
