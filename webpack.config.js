var webpack = require('webpack');
var path = require('path');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var BUILD_DIR = path.resolve(__dirname, 'public/js/');
var APP_DIR = path.resolve(__dirname, 'public/js/react');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
    entry: APP_DIR + '/index.jsx',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ],
    module: {
        loaders: [{
            test: /\.jsx?/,
            include: APP_DIR,
            loader: 'babel'
        }]
    },
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    }
};

// var cssConfig = Object.assign({}, config, {
//     name: "css",
//     entry: path.resolve(__dirname, 'public/css/style.css'),
//     plugins: [
//
//     ],
//     module: {
//
//         loaders: [{
//             test: /\.css$/,
//             loader: ExtractTextPlugin.extract('css-loader!postcss-loader')
//         }]
//     },
//     plugins: [
//         new ExtractTextPlugin(__dirname, 'prod.css')
//     ],
//     output: {
//         path: path.resolve(__dirname, 'public/css/'),
//         filename: "bundle.css"
//     },
// });

module.exports = [
    config//, cssConfig,
];
