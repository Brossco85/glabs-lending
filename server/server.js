require('./config/config');

const {CronJob} = require('cron');

const {mongoose} = require('./db/mongoose');

const {beginRetrieveNewBacsDocs} = require('./jobs/retrieveBacsDocuments');
const {beginExportReturnedDebits} = require('./jobs/exportReturnedDebits');


new CronJob('0 21 * * * *', () => {
  beginRetrieveNewBacsDocs();
}, null, true, "Europe/London");

new CronJob('5 21 * * * *', () => {
  beginExportReturnedDebits();
}, null, true, "Europe/London");