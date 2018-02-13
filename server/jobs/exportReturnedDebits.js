const {BacsDocument} = require('../models/bacsDocument');
const {ReturnedDebit} = require('../models/returnedDebit');


const getBacsReadyForProcessing = () => {
  return BacsDocument.find({status: "Saved"}).then((documents) => {
    return documents;
  })
}

const processDocuments = (docs) => {
  let processedDocs = docs.map((doc) => {
    return new Promise((resolve, reject) => {
      let returnedDebits = exportReturnedDebits(doc)
      resolve(returnedDebits)
    })
  })
  return Promise.all(processedDocs)
  .then((documents) => {
    return documents;
  }, (err) => {
    console.log(err)
    reject(err)
  });
}

const exportReturnedDebits = (doc) => {
  const returnedDebits = doc.bacsDocument.Data.ARUDD.Advice.OriginatingAccountRecords.OriginatingAccountRecord.ReturnedDebitItem;
  const originatingAccountRecord = doc.bacsDocument.Data.ARUDD.Advice.OriginatingAccountRecords.OriginatingAccountRecord.OriginatingAccount;
  let savedDebits = returnedDebits.map ((item) => {
    return new Promise ((resolve, reject) => {
      let returnedDebit = new ReturnedDebit({
        originatingAccountRecord: originatingAccountRecord,
        ref: item.ref,
        transCode: item.transCode,
        returnCode: item.returnCode,
        returnDescription: item.returnDescription,
        originalProcessingDate: item.originalProcessingDate,
        valueOf: item.valueOf[1],
        currency: item.currency,
        PayerAccount: item.PayerAccount
      })
      returnedDebit.save().then((debit) => {
        resolve(debit);
      })
    })
  })
  return Promise.all(savedDebits)
  .then((documents) => {
    return documents;
  }, (err) => {
    console.log(err)
    reject(err)
  });
};

const updateBacsDocumentStatus = (processedDocs) => {
  let completeDocs = processedDocs.map((doc) => {
    return new Promise((resolve, reject) => {
      BacsDocument.findByIdAndUpdate(doc._id, {$set: {status: "Processed"}}, {new: true}).then((bacsDoc) => {
        resolve(bacsDoc);
      })
    })
  })
  return Promise.all(completeDocs)
  .then((documents) => {
    return documents;
  }, (err) => {
    console.log(err)
    reject(err)
  });
};

const beginExportReturnedDebits = () => {
return getBacsReadyForProcessing()
.then((result)=> {
  processDocuments(result)
  .then((records) => {
    updateBacsDocumentStatus(result)
    .then((docs) => {
      console.log(docs);
    })
  })
})
};

module.exports = {beginExportReturnedDebits};