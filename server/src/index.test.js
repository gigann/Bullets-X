// WIP
const request = require('supertest');
const { app } = require('./index');

describe('GET /', () => {
   test('should return "Server is up and running".', (done) => {
     request(app)
       .get('/')
       .expect('Content-Type', /text/)
      .expect('Server is up and running.')
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })
})