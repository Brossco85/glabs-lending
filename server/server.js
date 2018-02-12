require('./config/config');

const scheduler = require('node-schedule');

const {retrieveBacsDocuments} = require('../jobs/RetrieveBacsDocuments');


const scheduleFetchNewBacsJob = scheduler.scheduleJob('0 * * * *', () => {
  retrieveBacsDocuments();
});
