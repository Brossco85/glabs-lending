const {BacsDocument} = require('../models/bacsDocument');
const {ReturnedDebit} = require('../models/returnedDebit');



const getBacsReadyForProcessing = () => {
  return new Promise((resolve, reject) => {
    return BacsDocument.find({status: "Ready For Processing"}).then((documents) => {
      if (documents.length > 0) {
        resolve(documents);
      } else {
        reject("No Documents in Ready for Processing State");
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}


const processDocuments = (docs) => {
  let processedDocs = docs.map((doc) => {
    return new Promise((resolve, reject) => {
      let returnedDebits = exportReturnedDebits(doc)
      resolve(returnedDebits)
    }, (err) => {
      console.log(err);
    })
  })
  return Promise.all(processedDocs)
  .then((documents) => {
    return documents;
  }, (err) => {
    console.log(err)
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
        valueOf: item.valueOf,
        currency: item.currency,
        PayerAccount: item.PayerAccount
      })
      returnedDebit.save().then((debit) => {
        resolve(debit);
      }, (err) => {
        console.log(err)
      })
    }, (err) => {
      console.log(err)
    })
  })
  return Promise.all(savedDebits)
  .then((documents) => {
    return documents;
  }, (err) => {
    console.log(err)
  });
};

const updateBacsDocumentStatus = (processedDocs) => {
  let completeDocs = processedDocs.map((doc) => {
    return new Promise((resolve, reject) => {
      BacsDocument.findByIdAndUpdate(doc._id, {$set: {status: "Processed"}}, {new: true}).then((bacsDoc) => {
        resolve(bacsDoc);
      })
    }, (err) => {
      console.log(err)
    });
  })
  return Promise.all(completeDocs)
  .then((documents) => {
    return documents;
  }, (err) => {
    console.log(err)
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
  }).catch((err) => {
    console.log(`${err} - exportReturnedDebits Job Exiting`);
  })
};


module.exports = {beginExportReturnedDebits};