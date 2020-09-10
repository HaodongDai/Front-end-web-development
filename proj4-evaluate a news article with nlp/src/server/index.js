const dotenv = require('dotenv') //this allows us to make the API key only belong to local system and to protect private API key
var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mockAPIResponse = require('./mockAPI.js')
const fetch = require('node-fetch')
const { response } = require('express')

dotenv.config()

//Store private API key
const apiKey = process.env.API_KEY
const url = 'https://api.meaningcloud.com/sentiment-2.1?key=' + apiKey +'&of=json&txt=' 

const app = express()

//Adding middleware to our app
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(dist/index.html)
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Server running on localhost: 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/postRoute',async function (req, res) {
    apiURL = url + req.body.text + '&lang=en'
    console.log(apiURL)
    const data = await fetch(apiURL)
    try {
        const newData = await data.json()
        console.log(newData)
        res.send(newData)
    } catch(error) {
        console.log('An error has occured: ', error)
    }
})
