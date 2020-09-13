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

const deleteUserInput = async function(url, data) {
    const res = await fetch(url, {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })

    try {
        const newData = await res.json();
        document.getElementById('result').innerHTML = newData.message;
    } catch(error) {
        console.log('An error occured: ', error);
    }
}

const updateUI = function(data) {
    const result = document.getElementById('result');
    result.innerHTML = ''; //remove all child element before updating
    const exclusion = ['latitude', 'longitude', 'location', 'img'];
    for (let key in data) {
        if (!exclusion.includes(key)) {
            let child = document.createElement('li');
            child.innerHTML = `${key}: ${data[key]}`;
            result.appendChild(child);
        } 
    }
    const locationPhoto = document.getElementById('location-photo');
    locationPhoto.src = data.img;
}

export {
    postUserInput,
    deleteUserInput,
    updateUI
}



