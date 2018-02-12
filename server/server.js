require('./config/config');

const scheduler = require('node-schedule');
const {mongoose} = require('./db/mongoose');

const {retrieveNewBacsDocuments} = require('./jobs/retrieveBacsDocuments');
const {getBacsReadyForProcessing} = require('./jobs/exportReturnedDebits');


const scheduleFetchNewBacsJob = scheduler.scheduleJob('18 * * * *', () => {
  retrieveNewBacsDocuments();
});

const scheduleExportReturnedDebitsJob = scheduler.scheduleJob('19 * * * *', () => {
  getBacsReadyForProcessing();
});
