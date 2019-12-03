const assert = require('chai').assert;
const env = process.env.NODE_ENV || 'test';
const request = require('supertest');
const dataSeed = require('./seed');
// Models
const models = require('./../server/models');
let server;
let listUsers = [];
describe('User', () => {

    before(async () => {
        server = require('../server');
        try {
            await models.user.bulkCreate(dataSeed.users);
        } catch (err) {
            console.log('Error:', err);
        }
    });

    after(async () => {
        await models.user.destroy({ truncate: true, cascade: false });
        await server.close();
    });

    describe('GET /api/users', () => {
        it('User should list 5 element', async () => {
            const res = await request(server).get('/api/users');
            assert.equal(res.status, 200);
            assert.equal(res.body.length, 5);
            listUsers = res.body;
        });
    });

    describe('GET /api/users/{$id}', () => {
        it('User should list one element', async () => {
            const res = await request(server).get('/api/users/' + listUsers[1].id);
            assert.equal(res.status, 200);
            assert.equal(res.body.email, listUsers[1].email);
        });
    });

    describe('PUT /api/users/{$id}', () => {
        it('User should update the name & email', async () => {
            const res = await request(server).put('/api/users/' + listUsers[1].id)
                .send('name=demo&email=demo@gmail.com')
                .set('Accept', 'application/json');
            assert.equal(res.status, 200);
            assert.equal(res.body.email, 'demo@gmail.com');
        });
    });

    describe('POST /api/users', () => {
        it('Insert new record with name & email', async () => {
            const res = await request(server).post('/api/users')
                .send('name=demo1&email=demo1@gmail.com')
                .set('Accept', 'application/json');
            assert.equal(res.status, 200);
            assert.equal(res.body.email, 'demo1@gmail.com');
        });
    });

    describe('POST /api/users/{$id}', () => {
        it('Delete record using id', async () => {
            const res = await request(server).delete('/api/users/' + listUsers[1].id)
                .set('Accept', 'application/json');
            assert.equal(res.status, 200);
        });
    });

});
