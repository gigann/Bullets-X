const request = require('supertest');
const { app } = require('./index');

describe('Root route', () => {
   test('GET / return "Server is up and running".', (done) => {
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

describe('activity routes', () => {
  test('GET /activity should return JSON content and OK (200).', (done) => {
    request(app)
      .get('/activity')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })

  test('GET /activity/users/:id (1) should return JSON content and OK (200).', (done) => {
    request(app)
      .get('/activity/users/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })

  test('GET /activity/:id should return JSON content and OK (200).', (done) => {
    request(app)
      .get('/activity/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })

  test('POST /activity/ should return JSON content and CREATED (201).', (done) => {
    request(app)
      .post('/activity/', JSON.stringify({
        user_id: 1,
        name: 'test name',
        description: 'test description'
      }))
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })

  test('DELETE /activity/:id should return JSON content and OK (200) or NOT FOUND (404).', (done) => {
    request(app)
      .delete('/activity/1')
      .expect('Content-Type', /json/)
      .expect(200 || 404)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })

})
