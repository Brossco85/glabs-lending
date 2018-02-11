const mongoose = require('mongoose');

const BacsDocument = mongoose.model('BacsDocument', {
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  bacsDocument: Object,
  status: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

module.exports = {BacsDocument};