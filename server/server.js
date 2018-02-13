require('./config/config');

const scheduler = require('node-schedule');
const {CronJob} = require('cron');

const {mongoose} = require('./db/mongoose');

const {beginRetrieveNewBacsDocs} = require('./jobs/retrieveBacsDocuments');
const {beginExportReturnedDebits} = require('./jobs/exportReturnedDebits');


new CronJob('* * * * * *', () => {
  beginRetrieveNewBacsDocs();
}, null, true, "Europe/London");

new CronJob('* * * * * *', () => {
  beginExportReturnedDebits();
}, null, true, "Europe/London");