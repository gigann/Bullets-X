// WIP
const request = require('supertest');
import { app } from './index';

describe('GET /', () => {
  test('should return "Server is up and running".', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect('Server is up and running.')
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })
})