const request = require('supertest');
const { app } = require('../../server');
const globals = require('./globals');

describe('DELETE /account', () => {
    it('Should not work is the token is invalid', async () => {
        await request(app)
            .delete('/account')
            .set({ authorization: 'Bearer INVALID_TOKEN' })
            .expect(401);
    });

    it('Should work', async () => {
        await request(app)
            .delete('/account')
            .set({ authorization: `Bearer ${globals.users.user1.token}` })
            .expect(200);

        await request(app)
            .post('/login')
            .send({
                login: globals.users.user1.username,
                password: globals.users.user1.password,
            })
            .expect(400);
    });
});
