# Project 4: Evaluate articles with natural language processing

The aim of this project is to use webpack to build an webpage that evaluate the inputs by user using nlp. There are 5 main steps in this project.
1. Setting up Webpack loaders and plugins
2. Setting up APIs and creating requests to external urls ([meaningcloud external sentiment analysis API](https://www.meaningcloud.com/products/sentiment-analysis))
3. Testing all the javasript functions using Jest
4. Creating layouts and applying styles using Sass
5. Setting up Service workers for production webpage that allows offline functionalities

## 1. Setting up Webpack

npm i -D @babel/core @babel/preset-env babel-loader //transpiler babel: translate newer ES6 to vanilla javascript that older browser can understand
npm i -D style-loader node-sass css-loader sass-loader 
npm i -D clean-webpack-plugin 
npm i -D html-webpack-plugin
npm i -D mini-css-extract-plugin //extract css to a seperate file in webpack output folder
npm i -D optimize-css-assets-webpack-plugin terser-webpack-plugin //minification of css to improve efficiency and transmission speed

## 2. Setting up the API

In express node server, a post route called 'postRoute' will respond to the POST request from client by firstly fetching required data from an external API (meaningCloud sentiment analysis API) and then sent the response object to the client for dynamically filling content on the page. The asynchronous functions are used to do fetch job from external API and from my own server endpoint.

Note: The private API_KEY is stored as environment variable and only available to local system.

## 3. Testing all js functions using Jest
 
The unit test tool Jest is used to test the whether form submission and server endpoint work properly. Syntax 'done' is used to successfully test the asynchronous function.

## 4. Creating layouts and applying styles using Sass

In this project, Sass is used instead of pure css because Sass provides several better features like preprocessing, variables, inheritance and so on.

## 5. Setting up Service Workers

Only webpack built on production mode sets up the Service Workers that allows for offline functionality.

# Summary

1. There are webpacks of two modes, development and production. Production mode uses minification and offline service to improve the product webpage performance.
2. Output library is 'Client', so the javascript functions needs to be prefixed with 'Client' when invoked. This is for the purpose of connection between the output file and these js files.
3. Webpack entry is a js file that all scss files, images and js functions are imported and exported.
