# Weather-Journal App Project

## Overview
This project aims to create an asynchronous web app that uses Web API(OpenWeather API) and user data to dynamically update the UI. 

## Description
1. A local server was created using **Express**. The GET and POST routes responded to corresponding request. An endpoint in server stored the data from external Web API and user's entered content in the webpage, which allows for future data retrieval from client.
2. A client was created to make GET request to external web API to fetch desired data (ie. temperature). This client also make POST request to my app to store the data obtained from the previous GET request and retrieve data from our app's endpoint to dynamically update the webpage UI.
3. Asynchronous function and Promises are key points in client side code to improve efficiency(app.js).

You can view this webpage at this link

