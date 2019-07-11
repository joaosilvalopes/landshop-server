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
        const token = jwt.sign({
            email: globals.users.user1.email,
            username: globals.users.user1.username,
            verified: globals.users.user1.verified,
        }, process.env.JWT_SECRET);

        await request(app)
            .post('/verify-email')
            .send({ token })
            .expect(200);
    });
});
