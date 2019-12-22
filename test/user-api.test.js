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
    });

    after(async () => {
        await models.user.destroy({ truncate: true, cascade: false });
        await server.close();
    });


    describe('POST /api/users', () => {
        it('Insert new record with name, email and password', async () => {
            const res = await request(server).post('/api/register')
                .send({
                    'name': 'Abc tobe',
                    'email': 'abc@gmail.com',
                    'password': 'abc'
                })
                .set('Accept', 'application/json');
            assert.equal(res.status, 200);
            assert.equal(res.body.message, 'User created');

        });
        it('Insert duplicate record with email', async () => {
            const res = await request(server).post('/api/register')
                .send({
                    'name': 'Abc tobe',
                    'email': 'abc@gmail.com',
                    'password': 'abc'
                })
                .set('Accept', 'application/json');
            assert.equal(res.status, 403);
        });
    });

    describe('POST /api/auth', () => {

        it('Valid user authentication', async () => {
            const res = await request(server).post('/api/auth').send({
                'email': 'abc@gmail.com',
                'password': 'abc'
            });
            assert.equal(res.status, 200);
            // Get Full data of the valid user login.
            listUsers = res.body;
        });

        it('Invalid Email', async () => {
            const res = await request(server).post('/api/auth').send({
                'email': 'abc12@gmail.com',
                'password': 'abc'
            });
            assert.equal(res.status, 401);
        });

        it('Invalid Password', async () => {
            const res = await request(server).post('/api/auth').send({
                'email': 'abc@gmail.com',
                'password': 'abcdd'
            });
            assert.equal(res.status, 403);
        });
    });


    describe('GET /api/users', () => {
        it('User should list all register users', async () => {
            const res = await request(server).get('/api/users');
            assert.equal(res.status, 200);
        });
    });

    describe('GET /api/user/?id={$id}', () => {

        it('Get Valid user using jwt token and id', async () => {
            const res = await request(server).get('/api/user/?id=' + listUsers.data.id)
                .set('Authorization', 'JWT ' + listUsers.token);
            assert.equal(res.status, 200);
        });

        it('Jwt token and id do not match', async () => {
            const res = await request(server).get('/api/user/?id=214325')
                .set('Authorization', 'JWT ' + listUsers.token);
            assert.equal(res.status, 403);
        });

        it('Invalid user using jwt token', async () => {
            const res = await request(server).get('/api/user/?id=' + listUsers.data.id)
                .set('Authorization', 'JWT 1' + listUsers.token);
            assert.equal(res.status, 401);
        });
    });

    describe('PUT /api/user/?id={$id}', () => {
        it('User should update the name & email', async () => {
            const res = await request(server).put('/api/user')
                .send({
                    'name': 'Updated abc',
                    'email': 'abc@gmail.com'
                })
                .set('Authorization', 'JWT ' + listUsers.token)
                .set('Accept', 'application/json');
            assert.equal(res.status, 200);
        });

        it('Invalid email do not allow update', async () => {
            const res = await request(server).put('/api/user')
                .send({
                    'name': 'Updated abc',
                    'email': 'invalid@gmail.com'
                })
                .set('Authorization', 'JWT ' + listUsers.token)
                .set('Accept', 'application/json');
            assert.equal(res.status, 401);
        });


        it('Invalid Authentication', async () => {
            const res = await request(server).put('/api/user')
                .send({
                    'name': 'Updated abc',
                    'email': 'abc@gmail.com'
                })
                .set('Authorization', 'JWT 1' + listUsers.token)
                .set('Accept', 'application/json');
            assert.equal(res.status, 403);
        });
    });

    describe('DELETE /api/user/?id={$id}', () => {

        it('Invalid JWT token', async () => {
            const res = await request(server).delete('/api/user/?id=' + listUsers.data.id)
                .set('Authorization', 'JWT 1' + listUsers.token)
                .set('Accept', 'application/json');
            assert.equal(res.status, 403);
        });

        it('Mismatch in JWT and id', async () => {
            const res = await request(server).delete('/api/user/?id= 1' + listUsers.data.id)
                .set('Authorization', 'JWT ' + listUsers.token)
                .set('Accept', 'application/json');
            assert.equal(res.status, 403);
        });

        it('Delete record using valid JWT and id', async () => {
            const res = await request(server).delete('/api/user/?id=' + listUsers.data.id)
                .set('Authorization', 'JWT ' + listUsers.token)
                .set('Accept', 'application/json');
            assert.equal(res.status, 200);
        });
    });

});
