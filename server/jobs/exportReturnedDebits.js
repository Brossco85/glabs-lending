const fs = require('fs');
const glob = require('glob');
const path = require('path');
const xml2js = require('xml2js');
const moment = require('moment');

require('../config/config');

const {mongoose} = require('../db/mongoose');

const {BacsDocument} = require('../models/bacsDocument');
const {ReturnedDebit} = require('../models/returnedDebit');

const getBacsReadyForProcessing = () => {
  return BacsDocument.find({status: "Saved"}).then((documents) => {
    return documents;
  })
}

const getOriginatingAccountRecords = (documents) => {
  let originatingAccountRecords = documents.map((document) => {
    return new Promise((resolve, reject) => {
      resolve(document.bacsDocument.Data.ARUDD.Advice.OriginatingAccountRecords.OriginatingAccountRecord)
    })
  })
  return Promise.all(originatingAccountRecords)
  .then((records) => {
    return records;
  }).catch((err) => {
    console.log(err);
  })
}

// const extractReturnedDebits = () => {
  
// }



getBacsReadyForProcessing()
.then((result)=> {
  getOriginatingAccountRecords(result)
  .then((records) => {
    console.log(records)
  })
})

