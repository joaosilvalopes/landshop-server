const request = require('supertest');
const express = require('express');
const secure = require('../secure');
const { signToken } = require('../../utils/authToken');

let app;
let server;
const user = { username: 'firstuser', verified: 1 };

describe('secure', () => {
    beforeAll(() => {
        app = express();
        server = app.listen(process.env.PORT || 3000);
        app.get('/', secure, (req, res) => res.json(req.user));
    });

    afterAll(() => server.close());

    it('Should send 401 when no authorization token is set', async () => {
        await request(app)
            .get('/')
            .expect(401);
    });

    it('Should send 401 when invalid token is set', async () => {
        await request(app)
            .get('/')
            .set({ authorization: 'Bearer someinvalidtoken' })
            .expect(401);
    });

    it('Should send 200 and pass user info to request ', async () => {
        const token = signToken(user);

        await request(app)
            .get('/')
            .set({ authorization: `Bearer ${token}` })
            .expect(200)
            .expect(({ body }) => expect(body).toMatchObject(user));
    });
});
