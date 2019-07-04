const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const secure = require('../secure');

let app;
let server;
const user = { username: 'userTest', verified: 1 };

describe('secure', () => {
    beforeAll(() => {
        app = express();
        server = app.listen(process.env.PORT || 3000);
        app.get('/', secure, (req, res) => res.json(req.user));
    });

    afterAll(() => server.close());

    it('Should send 403 when no authorization token is set', async () => {
        await request(app)
            .get('/')
            .expect(403);
    });

    it('Should send 403 when invalid token is set', async () => {
        const token = await jwt.sign(user, `${process.env.JWT_SECRET}qwertyu`);

        await request(app)
            .get('/')
            .set({ authorization: `Bearer ${token}` })
            .expect(403);
    });

    it('Should send 200 and pass user info to request ', async () => {
        const token = await jwt.sign(user, process.env.JWT_SECRET);

        await request(app)
            .get('/')
            .set({ authorization: `Bearer ${token}` })
            .expect(200)
            .expect(({ body }) => expect(body).toMatchObject(user));
    });
});
