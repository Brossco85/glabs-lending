<h1>Glabs Lending</h1>
Node Js app running Background workers at 16.00pm and 16.05pm each day to get xml files from a local directory, parsing to JSON before storing in a Mongo database and zipping the processed files: <br>


v1 of the app is set up to look for new orders from the previous day in arudd-directory/REFT1234

<b>Back End</b><br>
Node.js <br>
Cron <br>
MongoDB <br>

A basic React-Redux front end is currently in development using the following technologies:

<b>Front End</b> <br>
React <br>
Create-React-App <br>
React-Router <br>
Redux <br>

<h2>Install and Run App Locally</h2>
<h3>Requirements</h3> <br>

Node.js with NPM - install instructions [Here](https://docs.npmjs.com/getting-started/installing-node) <br>
MongoDB - Port 27017 - install instructions [Here](https://docs.mongodb.com/manual/installation/) <br>

1. Clone Repository using git clone https://github.com/Brossco85/glabs-lending.git <br>
2. From the Root Project folder `npm install` <br> 
3. `cd client` <br>
4. `npm install` <br>
5. `cd ..` <br>
6. start mongodb locally <br>
7. `npm start` to start the server and client concurrently and activate the background workers <br>
8. Beta front end application will be available in your browser at localhost:3000 <br>

<b>Next Steps</b><br>

API to GET/returned debits - in progress <br>
react-redux scalable front end - in progress <br>
build more flexible logic into the background workers <br>
delete files after processing <br>
investigate switch to agenda for better job handling [Agenda](https://github.com/agenda/agenda)


<h2>Test Suite</h2>
Expect <br>
Mocha <br>
Super Test <br>
Nodemon <br>

Run tests using `npm test` from the root directory
