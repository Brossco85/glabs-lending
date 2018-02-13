<h1>Glabs Lending</h1>
Node Js app running Background workers to get xml files from a local directory, parsing to JSON before storing in a Mongo database and zipping the processed files: <br>

v1 of the app is set up to check for new orders from the previous day in arudd-directory/REFT1234

<b>Back End</b><br>
Node.js <br>
Cron <br>
MongoDB <br>

<h2>Install and Run App Locally</h2>
<h3>Requirements</h3> <br>

Node.js with NPM - install instructions [Here](https://docs.npmjs.com/getting-started/installing-node) <br>
MongoDB - Port 27017 - install instructions [Here](https://docs.mongodb.com/manual/installation/) <br>

1. Clone Repository using git clone https://github.com/Brossco85/glabs-lending.git <br>
2. From the Root Project folder `npm install` <br> 
3. `npm install` <br>
4. start mongodb locally <br>
8. npm start to start the server and run the background workers <br>

<b>Next Steps</b><br>

API to GET/returned debits
react-redux scalable front end
build more flexible logic into the background workers
delete files after processing


<h2>Test Suite</h2>
Expect <br>
Mocha <br>
Super Test <br>
Nodemon <br>

Run tests using `npm test` from the root directory
