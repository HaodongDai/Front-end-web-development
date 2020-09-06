/* After finishing installing express, body-parser and cors package */


// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware (use or add the middleware to the stack) */
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder

/* express.static is the only built-in middleware fucntion of express, 
   serving the static files in a directory named 'website'.
   Static files are files that clients download as-is from server (express, by default, doesn't allow for serving static files) */
app.use(express.static('website'));


// Setup Server
const port = 3000; // setting port as 3000
const server = app.listen(port, () => {console.log(`Server running on localhost: ${port}`)});

// Add a GET route to return the projectData object when a request is made to the homepage
app.get('/getRoute', function (req, res) {
    // return projectData object
    res.send(projectData);
})

// Add a POST route to add data to object projectData when a request is made to the homepage
app.post('/postRoute', function (req, res) {
    // setting each field of the object 'projectData' as corresponding value
    projectData['temperature'] = req.body.temperature;
    projectData['date'] = req.body.date;
    projectData['userResponse'] = req.body.userResponse;
    res.send(projectData);
})
