const mongoose = require('mongoose');

const ReturnedDebit = mongoose.model('ReturnedDebit', {
  originatingAccountRecord: Object,
  ref: {
    type: String,
    required: true
  },
  transCode: {
    type: String,
    required: true
  },
  returnCode: {
    type: String,
    required: true
  },
  returnDescription: String,
  originalProcessingDate: String,
  valueOf: String,
  currency: String,
  PayerAccount: Object
});

module.exports = {ReturnedDebit};