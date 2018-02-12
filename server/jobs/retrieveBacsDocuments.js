const fs = require('fs');
const glob = require('glob');
const path = require('path');
const xml2js = require('xml2js');
const moment = require('moment');


const {BacsDocument} = require('../models/bacsDocument');
const {ReturnedDebit} = require('../models/returnedDebit');


const parser = new xml2js.Parser({explicitArray : false, ignoreAttrs : false, mergeAttrs : true});

// potentially add files that are new or updated in the last day


const archiveBacsDocument = (folder) => {
  const zipper = new zip();
  zipper.addLocalFolder(path.resolve(__dirname, `../../arudd-directory/REFT1234/${folder}`));
  zipper.writeZip(path.resolve(__dirname, `../../arudd-directory/archive/${folder}.zip`));
  console.log("File has been saved to the database and archived");
};

//  if all documents are created ok then change bacs document status to "Complete"

const retrieveNewBacsDocuments = () => {
  return new Promise ((resolve, reject) => {
    const bacsFolderDate = moment().subtract(11, 'days').format('YYYY-MM-DD');
    let newBacs = glob.sync(path.join(__dirname, `../../arudd-directory/REFT1234/${bacsFolderDate}/*.xml`));
    resolve(newBacs)
  }).catch((err) => {
    console.log(err);
  })
};

const readFilesFromDirectory = (savedDocs) => {
  let files = savedDocs.map((savedDoc) => {
    return new Promise ((resolve, reject) => {
      fs.readFile(savedDoc, (err, data) => {
        resolve(data);
      })
    })
  })
  return Promise.all(files)
  .then((documents) => {
    return documents;
  }).catch((err) => {
    console.log(err);
  })
}

const parseBacsDocuments = (xmlDocs) => {
  let parsedData = xmlDocs.map((xmlDoc) => {
    return new Promise((resolve, reject) => {
      return parser.parseString(xmlDoc, (err, res) => {
        resolve(res)
      })
    })
  })
  return Promise.all(parsedData)
  .then((documents) => {
    return documents;
  }).catch((err) => {
    console.log(err);
  })
}

const saveBacsDocuments = (parsedDocs) => {
  let savedDocs = parsedDocs.map((parsedDoc) => {
    return new Promise((resolve, reject) => {
      let bacsDocument = new BacsDocument ({
        name: `arudd-${parsedDoc.BACSDocument.Data.ARUDD.Header.adviceNumber}`,
        bacsDocument: parsedDoc.BACSDocument,
        status: "Saved"
      });
      bacsDocument.save().then((doc) => {
        resolve(doc);
      }, (err) => {
        console.log(err)
      })
    })
  })
  return Promise.all(savedDocs)
  .then((documents) => {
    return documents;
  }).catch((err) => {
    console.log(err);
  })
}

retrieveNewBacsDocuments()
.then((newDocs) => {
  readFilesFromDirectory(newDocs)
  .then((returnedFiles) => {
    parseBacsDocuments(returnedFiles)
    .then((parsedDocuments) => {
      saveBacsDocuments(parsedDocuments)
      .then((savedDocs) => {
        console.log(`${savedDocs.length} new Bacs Documents have been saved to the database`);
      })
    })
  })
});


module.exports = {retrieveNewBacsDocuments};