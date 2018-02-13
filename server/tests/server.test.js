const expect = require('expect');
const request = require('supertest');
const {ObjectId} = require('mongodb');


const {ReturnedDebit} = require('../models/returnedDebit');



describe('GET/returneddebits', () => {

  it('Should return a list of all returned debits', (done) => {
    request(app)
    .get('/returneddebits')
    .expect(200)
    .expect((res) => {
      expect(res.body.returneddebits.length).toBe(2);
    })
    .end(done);
  });
});