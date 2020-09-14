# Travel App Project

## Overview
This project aims to create travel app that takes in user's desired destination place and date of leaving to dynamically generate the weather and picture of the destination place.
This project was done in **Webpack Environment**, and **Express** server were used for development. The final production webpage was wrapped up by Service Worker that allows for offline performance.

## Description
1. A Node server was created using **Express**. 
The GET, POST and DELETE routes responded to corresponding request. The server received data from client (user's input: date of leaving, date of return and destination location)  and fetch data from three external Web APIs where one of those are reliant on another to work.
2. A client was created to send requests to server and retrieved data (destination place picture and current or future weather condition based on date of leaving) from server to dynamically update the UI.
3. Asynchronous function and Promises are key points in server side code to improve efficiency(server.js).
4. The whole project was done in Webpack environment. The final output is in production mode in which some plugins like minification and optimization plugins improves network transmission speed.
5. The final project output was wrapped in Service Workers.


