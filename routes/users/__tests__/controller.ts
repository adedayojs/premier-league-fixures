const app = require('../../../app');
const request = require('supertest')

describe('POST ENDPOINT', ()=>{
    it('Should Return Bad Request If No Body Is Attached', async()=>{
        const res = await request(app).post('/users')
        expect(res.status).toBe(400)
    });
    it('Should Create A New User', async()=>{
        const res = await request(app).post('/users')
        expect(res.status).toBe(201)
    });
})