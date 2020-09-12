import fetch from "node-fetch";
/* Global Variables */

//post the user input: location and date of leaving to server and get back projectData from server
const postUserInput = async function(url, data) {
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
        console.log('An error occured: ', error)
    }
}


const updateUI = async function(data) {
    document.getElementById('entryHolder').innerHTML = data.temperature;
}



export {
    postUserInput,
    updateUI
}

/*
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
//document.getElementById('generate').addEventListener('click', enclosedSteps);
*/


