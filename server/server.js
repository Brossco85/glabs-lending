require('./config/config');

const scheduler = require('node-schedule');

const {retrieveBacsDocuments} = require('./jobs/retrieveBacsDocuments');


const scheduleFetchNewBacsJob = scheduler.scheduleJob('0 * * * *', () => {
  retrieveBacsDocuments();
});
