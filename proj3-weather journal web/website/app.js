/* Global Variables */
// getting the baseURL from openweathermap.org website
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=557bc001cdb723656a2d102b0ef7b12a';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Asynchronous function using fetch() to make GET request
// FETCH method return promise and send the requests to server without refreshing the page
const getWeatherData = async function(baseURL, zipCode, apiKey) {
    const url = baseURL + zipCode + apiKey;
    const res = await fetch(url) //default method is GET
    try {
        const weatherData = await res.json(); //convert to json format
        return weatherData;
    } catch(error) {
        console.log('An error occured: ', error);
    }
}

//Asynchronous function to make POST request
//Set the default function parameters
const postWeatherData = async function(url = '', data = {}) {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data) // this should match content-type, relying on bodyParser in the server side code
    })

    try {
        const newData = await res.json();
        return newData;
    } catch(error) {
        console.log('An error occured: ', error);
    }
}

//update the UI by retrieving data from server and fill content into html elements
const updateUI = async function() {
    const res = await fetch('/getRoute');

    try {
        const retrievedData = await res.json();
        document.getElementById('temp').innerHTML = 'Temperature: ' + retrievedData.temperature;
        document.getElementById('date').innerHTML = 'Date: ' + retrievedData.date;
        document.getElementById('content').innerHTML = "User's Feeling" + retrievedData.userResponse;
    } catch(error) {
        console.log('An error occured: ', error);
    }
}


//Enclosed all the steps (get data from external API, post data to server, update UI)

function enclosedSteps() {
    //get the entered zip code by user in corresponding <input> tag
    const zipCode = document.getElementById('zip').value;
    getWeatherData(baseURL, zipCode, apiKey)
    .then(function (data) {
        const feeling = document.getElementById('feelings').value;
        postWeatherData('/postRoute', {temperature: data.main.temp, date: newDate, userResponse: feeling});
    })
    .then(updateUI());
}


//Event listener for element with #generate when it's clicked
document.getElementById('generate').addEventListener('click', enclosedSteps);




/* Test code to see how the data from external API looks like 
document.getElementById('generate').addEventListener('click', test);

function test() {
    const zipCode = document.getElementById('zip').value;
    getWeatherData(baseURL,zipCode,apiKey).then((data)=>console.log(data));
}

*/

/* The data from external API is:

    {coord: {…}, weather: Array(1), base: "stations", main: {…}, visibility: 10000, …}
    base: "stations"
    clouds: {all: 20}
    cod: 200
    coord: {lon: -122.09, lat: 37.39}
    dt: 1599340943
    id: 0
    main: {temp: 308.79, feels_like: 307.15, temp_min: 305.93, temp_max: 310.93, pressure: 1014, …}
    name: "Mountain View"
    sys: {type: 1, id: 5845, country: "US", sunrise: 1599313367, sunset: 1599359478}
    timezone: -25200
    visibility: 10000
    weather: [{…}]
    wind: {speed: 2.1, deg: 0}
    __proto__: Object

*/
