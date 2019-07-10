const request = require('supertest');
const { app } = require('../../server');
const globals = require('./globals');

describe('DELETE /account', () => {
    it('Should not work is the token is invalid', async () => {
        await request(app)
            .delete('/account')
            .set({ authorization: 'Bearer INVALID_TOKEN' })
            .expect(403);
    });

    it('Should work', async () => {
        await request(app)
            .delete('/account')
            .set({ authorization: `Bearer ${globals.user.token}` })
            .expect(200);

        await request(app)
            .post('/login')
            .send({
                login: globals.user.username,
                password: globals.user.password,
            })
            .expect(400);
    });
});
