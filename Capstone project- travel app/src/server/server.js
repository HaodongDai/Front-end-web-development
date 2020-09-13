// Setup empty JS object to act as endpoint
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const fetch = require('node-fetch')

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
app.use(express.static('dist')); //no need to use relative path, express lookes at this path starting from root directory


// Setup Server
const port = 8080; // setting port as 3000
const server = app.listen(port, () => {console.log(`Server running on localhost: ${port}`)});

// Add a GET route to return the projectData object when a request is made to the homepage
app.get('/getRoute', function (req, res) {
    // return projectData object
    res.send(projectData);
})


// Add a POST route to add data to object projectData when a request is made to the homepage
app.post('/postRoute', async function (req, res) {
    const location = req.body.location;
    const date = req.body.dateOfLeaving;
    const dateOfReturn = req.body.dateOfReturn;
    const newDate = new Date(date);
    const newDateOfReturn = new Date(dateOfReturn);
    const length = Math.round((newDateOfReturn.getTime() - newDate.getTime()) / (1000 * 3600 * 24));
    projectData = await enclosedSteps(location, date);
    projectData.lengthOfTrip = length;
    res.send(projectData);
})

app.delete('/deleteRoute', function(req, res) {
    if (req.body.location === projectData.location) {
        projectData = {};
        res.send({message: 'The record has been successfully deleted from server!'});
    } else {
        res.send({message: 'No record match your selection'});
    }
})

// Check whether the date of leaving is within 7 days from current time
function checkdate(dateOfLeaving) {
    const newDate = new Date(dateOfLeaving);
    const currentDate = new Date();
    // caluculate difference in days
    const diff = (newDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24);
    if (diff <= 7 & diff >= 0) {
        return true;
    } else {
        return false;
    }
}

const geoUserName = 'dhd123' //geoNames only need username, not API_KEY
const getCoordinate = async function(cityName, userName) {
    const url = `http://api.geonames.org/searchJSON?name=${cityName}&maxRows=10&username=${userName}`;
    const res = await fetch(url);
    try {
        const geoData = await res.json();
        let ret = {};
        ret.latitude = geoData.geonames[0].lat;
        ret.longitude = geoData.geonames[0].lng;
        ret.location = cityName;
        return ret;
    } catch(error) {
        console.log('An error occured: ', error);
    }
}


const weatherBitAPI = 'dd3e1f0a089545eba5e1890a584eef8d';
const getFutureWeather = async function(data, apiKey) {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${data.latitude}&lon=${data.longitude}&key=${apiKey}`;
    const res = await fetch(url);
    try {
        const weatherData = await res.json();
        data.description = weatherData.data[0].weather.description;
        data.minTemp = weatherData.data[0].min_temp;
        data.appMinTemp = weatherData.data[0].app_min_temp;
        data.maxTemp = weatherData.data[0].max_temp;
        data.appMaxTemp = weatherData.data[0].app_max_temp
        data.uv = weatherData.data[0].uv;
        data.temperature = weatherData.data[0].temp;
        return data;
    } catch(error) {
        console.log('An error occured: ', error);
    }
}


const getCurrentWeather = async function(data, apiKey) {
    const url = `https://api.weatherbit.io/v2.0/current?lat=${data.latitude}&lon=${data.longitude}&key=${apiKey}`;
    const res = await fetch(url);
    try {
        const weatherData = await res.json();
        data.description = weatherData.data[0].weather.description;
        data.appTemp = weatherData.data[0].app_temp;
        data.temperature = weatherData.data[0].temp;
        data.uv = weatherData.data[0].uv;
        data.sunrise = weatherData.data[0].sunrise;
        data.sunset = weatherData.data[0].sunset;
        return data;
    } catch(error) {
        console.log('An error occured: ', error);
    }
}

const pixabayAPI = '18269380-1c1bb144b5dceda2dc7bf77df';
const getPixabayPic = async function(data, pixabayAPI) {
    const url = `https://pixabay.com/api/?q=${data.location}&image_type=photo&key=${pixabayAPI}`;
    const res = await fetch(url)
    try {
        const picData = await res.json();
        data.img = picData.hits[0].webformatURL;
        return data; //this will return the final data including all the information we want
    } catch(error) {
        console.log('An error occured: ', error);
    }
}

const enclosedSteps = async function(location, dateOfLeaving) { 
    let locationData = await getCoordinate(location, geoUserName);

    if (checkdate(dateOfLeaving)) { // whithin 7 days, return current weather forecast
        let weatherData = await getCurrentWeather(locationData, weatherBitAPI);
        let finalResult = await getPixabayPic(weatherData, pixabayAPI);
        return finalResult;
    } else { // beyond 7 days, return future weather forecast
        let weatherData = await getFutureWeather(locationData, weatherBitAPI);
        let finalResult = await getPixabayPic(weatherData, pixabayAPI);
        return finalResult;
    } 
}