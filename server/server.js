require('./config/config');

const {CronJob} = require('cron');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {ReturnedDebit} = require('./models/returnedDebit');


const {beginRetrieveNewBacsDocs} = require('./jobs/retrieveBacsDocuments');
const {beginExportReturnedDebits} = require('./jobs/exportReturnedDebits');

const app = express();
const port = process.env.PORT;

app.get('/returneddebits', (req, res) => {
  ReturnedDebit.find().then((returnedDebits) => {
    res.status(200).send({returnedDebits});
  }, (err) => {
    res.status(400).send(err);
  });
});


new CronJob('* * * * *', () => {
  beginRetrieveNewBacsDocs();
}, null, true, "Europe/London");

new CronJob('*/2 * * * *', () => {
  beginExportReturnedDebits();
}, null, true, "Europe/London");

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};