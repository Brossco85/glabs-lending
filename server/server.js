require('./config/config');

const scheduler = require('node-schedule');
const {mongoose} = require('./db/mongoose');

const {retrieveBacsDocuments} = require('./jobs/retrieveBacsDocuments');


const scheduleFetchNewBacsJob = scheduler.scheduleJob('34 * * * *', () => {
  retrieveBacsDocuments();
});
