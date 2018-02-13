const {expect} = require('chai');
const {ObjectId} = require('mongodb');


const {ReturnedDebit} = require('../../models/returnedDebit');


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