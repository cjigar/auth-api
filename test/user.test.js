const assert = require('chai').assert;
const expect = require('chai').expect;
const env = process.env.NODE_ENV || 'development';
const request = require('supertest');
let server;
describe('User', () => {

    beforeEach(() => { server = require('../server'); });
    afterEach(() => { server.close(); });

    describe('#Before Login', () => {

        it('1# load welcome page', (done) => {
            const res = request(server).get('api/');
            console.log('RES', res.status);
            expect(res.status).to.be.a(200);
        });

    });

    describe('#After Login', () => {

    });
});
