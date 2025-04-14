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

  test('POST /activity should return JSON content and CREATED (201).', (done) => {
    request(app)
      .post('/activity')
    .send({
        user_id: 1,
        name: 'test name',
        description: 'test description'
    })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })

  test('PATCH /activity/:id should return JSON content and OK (200).', (done) => {
    request(app)
      .patch('/activity/1')
    .send({
        user_id: 1,
        name: 'test name',
        description: 'test description'
    })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })

  test('DELETE /activity/:id should return JSON content and OK (200).', (done) => {
    request(app)
      .delete('/activity/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })
})

describe('award routes', () => {
  test('GET /award should return JSON content and OK (200).', (done) => {
    request(app)
      .get('/award')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })

  test('GET /award/:id should return JSON content and OK (200).', (done) => {
    request(app)
      .get('/award/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })

  test('POST /award should return JSON content and CREATED (201).', (done) => {
    request(app)
      .post('/award')
      .send({
        name: 'test name',
        description: 'test description',
        due_date: new Date(),
        bullet_minimum: 0,
        bullet_maximum: 1
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })

  test('PATCH /award/:id should return JSON content and OK (200).', (done) => {
    request(app)
      .patch('/award/1')
      .send({
        name: 'test name',
        description: 'test description'
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })
  test('DELETE /award/:id should return JSON content and OK (200).', (done) => {
    request(app)
      .delete('/award/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })
})

