const fs = require('fs');
const glob = require('glob');
const path = require('path');
const xml2js = require('xml2js');
const moment = require('moment');
const zip = require('adm-zip');



const {BacsDocument} = require('../models/bacsDocument');
const {ReturnedDebit} = require('../models/returnedDebit');


const parser = new xml2js.Parser({explicitArray : false, ignoreAttrs : false, mergeAttrs : true});

// post mvp - to check when the last folder was added, for situations where there may be delay in uploads

// const getPreviousFolderDate = () => {
//   fs.readdir(path.resolve(__dirname, `../../arudd-directory/REFT1234`),(err, list) => {
//     const mostRecentFolder = list.reduce((mostRecent, folder) => {
//      stats = fs.statSync(path.resolve(path.join(__dirname, `../../arudd-directory/REFT1234`, folder)));
//      return mostRecent.birthtime > stats.birthtime ? mostRecent : folder;
//    })
//     const mostRecentFolderDate = moment(mostRecentFolder);
//     console.log(mostRecentFolderDate)
//   })
// }


const retrieveNewBacsDocuments = () => {
  return new Promise ((resolve, reject) => {
    const bacsFolderDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
    let newBacs = glob.sync(path.join(__dirname, `../../arudd-directory/REFT1234/${bacsFolderDate}/*.xml`));
    if (newBacs.length > 0) {
    resolve(newBacs)
  } else {
    reject(`No Folder for ${bacsFolderDate} found`);
  }
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
};

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
};

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
};

const archiveBacsDocument = () => {
  return new Promise((resolve, reject) => {
    const bacsFolderDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const zipper = new zip();
    zipper.addLocalFolder(path.resolve(__dirname, `../../arudd-directory/REFT1234/${bacsFolderDate}`));
    zipper.writeZip(path.resolve(__dirname, `../../arudd-directory/archive/${bacsFolderDate}.zip`));
    resolve(`${bacsFolderDate} has been archived`);
  }).catch((err) => {
    console.log(err);
  })
};

const beginRetrieveNewBacsDocs = () => {
  return retrieveNewBacsDocuments()
  .then((newDocs) => {
    readFilesFromDirectory(newDocs)
    .then((returnedFiles) => {
      parseBacsDocuments(returnedFiles)
      .then((parsedDocuments) => {
        saveBacsDocuments(parsedDocuments)
        .then((savedDocs) => {
          archiveBacsDocument()
          .then((archiveResponse) => {
            console.log(`${savedDocs.length} new Bacs Documents have been saved to the database`);
            console.log(archiveResponse);
          })
        })
      })
    })
  });
};


module.exports = {beginRetrieveNewBacsDocs};