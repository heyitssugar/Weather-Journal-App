// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app 
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const serverPort = 4000;
const serverHostName = 'localhost';     
// Spin up the server
const server = app.listen(serverPort, listening);
function listening(){
    // to make sure the server is working "node server.js"
    console.log(`server is running at http://${serverHostName}:${serverPort}`);  
};

// GET Route
app.get('/all', sendData);
function sendData(request, response){ 
    response.send(projectData);
};

// POST Route
app.post('/add', postInfo);
function postInfo(request, response){
    projectData['date'] = request.body.date;
    projectData['temp'] = request.body.temp;
    projectData['content'] = request.body.content;
    response.send(projectData);
};
