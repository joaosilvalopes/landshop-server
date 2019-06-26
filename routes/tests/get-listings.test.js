/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../server');
const dbUtils = require('../../db-utils');

describe('GET /listings', () => {
    beforeAll(async () => {
        await dbUtils.dropTables();
        await dbUtils.createTables();
        await dbUtils.insertData();
    });

    it('Should respond with JSON', (done) => {
        request(app)
            .get('/listings')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
