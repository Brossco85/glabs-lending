const {expect} = require('chai');

const {BacsDocument} = require('../../models/bacsDocument');

describe('BacsDocument', () => {
  it('should be invalid if name is empty', (done) => {
    let bacsDocument = new BacsDocument();
    bacsDocument.validate((err) => {
      expect(err.errors.name).to.exist;
      done();
    });
  });

  it('should be invalid if status is empty', (done) => {
    let bacsDocument = new BacsDocument();
    bacsDocument.validate((err) => {
      expect(err.errors.status).to.exist;
      done();
    });
  });

  it('should be invalid if bacsDocument is empty', (done) => {
    let bacsDocument = new BacsDocument();
    bacsDocument.validate((err) => {
      expect(err.errors.bacsDocument).to.exist;
      done();
    });
  });
});