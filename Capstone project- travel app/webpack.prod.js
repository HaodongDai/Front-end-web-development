const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const WorkboxPlugin = require('workbox-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //a seperate css file will be created in webpack output folder
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') //search for css assets during the webpack build and minimize the css
const TerserPlugin = require('terser-webpack-plugin')

/* 
1. sass-loader is a loader for Webpack for compiling SCSS/Sass files.
2. style-loader injects our styles into our DOM.
3. css-loader interprets @import and @url() and resolves them.
4. mini-css-extract-plugin extracts our CSS out of the JavaScript bundle into a separate file, essential for production builds.
*/

module.exports = {
    entry: './src/client/index.js',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    mode: 'production',
    optimization: {
        //help minimize certain files for better performance of our app
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                exclude: /node_modules/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new WorkboxPlugin.GenerateSW(), //webpack server plugin, allowing for offline server
        new MiniCssExtractPlugin({filename: '[name].css'})
    ]
}