const {expect} = require('chai');
const request = require('supertest');
const {ObjectId} = require('mongodb');

const {app} = require('./../server');
const {ReturnedDebit} = require('../models/returnedDebit');

const returnedDebits = [{
  _id: new ObjectId(),
  originalAccountingRecord: {},
  ref: "X01234",
  transCode: "17",
  returnCode: "1012",
  valueOf: "65.00",
  currency: "GBP",
  payerAccount: {}
},
{
  _id: new ObjectId(),
  originalAccountingRecord: {},
  ref: "X01235",
  transCode: "18",
  returnCode: "1013",
  valueOf: "70.00",
  currency: "GBP",
  payerAccount: {}
}];

beforeEach((done) => {
  ReturnedDebit.remove({}).then(() => {
    return ReturnedDebit.insertMany(returnedDebits);
  }).then(() => done());
});

describe('GET/returneddebits', () => {

  it('Should return a list of all returned debits', (done) => {
    request(app)
    .get('/returneddebits')
    .expect(200)
    .expect((res) => {
      expect(res.body.returnedDebits.length).to.equal(2);
    })
    .end(done);
  });
});