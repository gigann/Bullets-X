const request = require('supertest');
const { app } = require('./index');

describe('Root endpoint', () => {
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

describe('activity endpoints', () => {
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

  test('GET /activity/users/:id should return JSON content and OK (200).', (done) => {
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

describe('award endpoints', () => {
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

describe('bullet endpoints', () => {
  test('GET /bullet should return JSON content and OK (200).', (done) => {
    request(app)
      .get('/bullet')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })

  test('GET /bullet/users/:id should return JSON content and OK (200).', (done) => {
    request(app)
      .get('/bullet/users/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })

  test('GET /bullet/award/:award_id should return JSON content and OK (200).', (done) => {
    request(app)
      .get('/bullet/award/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })

  test('GET /bullet/latest-awarded should return JSON content and OK (200).', (done) => {
    request(app)
      .get('/bullet/latest-awarded')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })

  test('GET /bullet/with_award_name/:user_id should return JSON content and OK (200).', (done) => {
    request(app)
      .get('/bullet/with_award_name/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })

  test('GET /bullet/completed/:user_id should return JSON content and OK (200).', (done) => {
    request(app)
      .get('/bullet/completed/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })

  test('GET /bullet/completed/:user_id/:award_id should return JSON content and OK (200).', (done) => {
    request(app)
      .get('/bullet/completed/1/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })

  test('POST /bullet should return JSON content and CREATED (201).', (done) => {
    request(app)
      .post('/bullet')
      .send({
        user_id: 1,
        name: 'test',
        action: 'test',
        impact: 'test',
        result: 'test',
        status: 'Drafting',
        drafting: true,
        award_id: 2,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) {
          console.log(res?.body || res?.text);
          throw err;
        }
        done();
      })
  })

  test('PATCH /bullet/:id should return JSON content and OK (200).', (done) => {
    request(app)
      .patch('/bullet/2')
      .send({
        user_id: 1,
        name: 'test',
        action: 'test',
        impact: 'test',
        result: 'test',
        status: 'Drafting',
        drafting: true,
        award_id: 2,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(res?.body || res?.text);
          throw err;
        }
        done();
      })
  })

  test('DELETE /bullet/:id should return JSON content and CREATED (201).', (done) => {
    request(app)
      .delete('/bullet/1')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })
})

describe('unit endpoints', () => {
  test('GET /unit should return JSON content and OK (200).', (done) => {
    request(app)
      .get('/unit')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })

  test('GET /unit/:name should return JSON content and OK (200).', (done) => {
    request(app)
      .get('/unit/53 SOPS Det C')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })

  test('POST /unit should return JSON content and CREATED (201).', (done) => {
    request(app)
      .post('/unit')
      .send({
        name: 'TEST UNIT',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })

  test('PATCH /unit/:id should return JSON content and OK (200).', (done) => {
    request(app)
      .patch('/unit/1')
      .send({
        name: 'TEST',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })

  test('DELETE /unit/:id should return JSON content and OK (200).', (done) => {
    request(app)
      .delete('/unit/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })
})

describe('user_award endpoints', () => {
  test('GET /user_award should return JSON content and OK (200).', (done) => {
    request(app)
      .get('/unit')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })

  test('GET /user_award/users/:user_id should return JSON content and OK (200).', (done) => {
    request(app)
      .get('/user_award/users/2')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })

  test('GET /user_award/:user_id/awards should return JSON content and OK (200).', (done) => {
    request(app)
      .get('/user_award/2/awards')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })

  test('POST /user_award should return JSON content and CREATED (201) or CONFLICT (409).', (done) => {
    request(app)
      .post('/user_award')
      .send({
        user_id: 2,
        award_id: 2,
        status: 'Status'
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(r=>[201, 409].includes(r.status))
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })

  test('PATCH /user_award/:id should return JSON content and CREATED (201).', (done) => {
    request(app)
      .patch('/user_award/1')
      .send({
        status: 'Status 2',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })

  test('DELETE /user_award/:id should return JSON content and CREATED (201).', (done) => {
    request(app)
      .delete('/user_award/1')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })
})