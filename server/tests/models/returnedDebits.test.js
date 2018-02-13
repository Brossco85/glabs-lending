const {expect} = require('chai');
const {ObjectId} = require('mongodb');


const {ReturnedDebit} = require('../../models/returnedDebit');

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

describe('ReturnedDebits', () => {
  it('should be invalid if ref is empty', (done) => {
    let returnedDebit = new ReturnedDebit();
    returnedDebit.validate((err) => {
      expect(err.errors.ref).to.exist;
      done();
    });
  });

  it('should be invalid if transCode is empty', (done) => {
    let returnedDebit = new ReturnedDebit();
    returnedDebit.validate((err) => {
      expect(err.errors.transCode).to.exist;
      done();
    });
  });

  it('should be invalid if returnCode is empty', (done) => {
    let returnedDebit = new ReturnedDebit();
    returnedDebit.validate((err) => {
      expect(err.errors.returnCode).to.exist;
      done();
    });
  });
});