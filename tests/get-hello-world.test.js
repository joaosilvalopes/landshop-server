const request = require('supertest');
const app = require('../server');

describe('GET /hello-world', () => {
    it('sends hello world message', async () => {
        await request(app)
            .get('/hello-world')
            .expect(200, {
                message: 'Hello World!',
            });
    });
});
