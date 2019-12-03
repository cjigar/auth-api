
const assert = require('chai').assert;
// const expect = require('chai').expect;
const env = process.env.NODE_ENV || 'test';
const request = require('supertest');
let server;
describe('User', () => {

    // before(() => { server = require('../server'); });

    // after(() => { server.close(); });

    // describe('#Before Login', () => {
    //     it('GET /api', async () => {
    //         const res = await request(server).get('/api');
    //         assert.equal(res.status, 200);
    //     });


    //     it('POST /api/signin - invalid email', async () => {
    //         const res = await request(server)
    //             .post('/api/signin')
    //             .send({ email: 'abc@gmailcom', password: '12345' });

    //         assert.equal(res.status, 422);
    //     });

    //     it('POST /api/signin - invalid password', async () => {
    //         const res = await request(server)
    //             .post('/api/signin')
    //             .send({ email: 'abc@gmail.com', password: '1234' });

    //         assert.equal(res.status, 422);
    //     });

    //     it('POST /api/signin - Success', async () => {
    //         const res = await request(server)
    //             .post('/api/signin')
    //             .send({ email: 'abc@gmail.com', password: '12345' });

    //         assert.equal(res.status, 200);
    //     });

    //     it('POST /api/signup - invalid name', async () => {
    //         const res = await request(server)
    //             .post('/api/signup')
    //             .send({ email: 'abc@gmailcom', password: '12345' });

    //         assert.equal(res.status, 422);
    //     });

    //     it('POST /api/signup - invalid email', async () => {
    //         const res = await request(server)
    //             .post('/api/signup')
    //             .send({ name: 'jigar', email: 'abgmail.com', password: '12345' });

    //         assert.equal(res.status, 422);
    //     });

    //     it('POST /api/signup - invalid password', async () => {
    //         const res = await request(server)
    //             .post('/api/signup')
    //             .send({ name: 'jigar', email: 'abc@gmail.com', password: '1234' });
    //         assert.equal(res.status, 422);
    //     });

    //     it('POST /api/signup - Success', async () => {
    //         const res = await request(server)
    //             .post('/api/signup')
    //             .send({ name: 'jigar', email: 'abc@gmail.com', password: '12345' });

    //         assert.equal(res.status, 200);
    //     });
    // });

    // describe('#After Login', () => {


    // });
});
