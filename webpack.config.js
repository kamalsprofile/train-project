const path = require('path');
require("babel-polyfill");

module.exports = {
    entry: ["babel-polyfill", "./src/app.js"],
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js"
    },
    module: {
        rules: [{
            loader: "babel-loader",
            test: /\.js$/,
            exclude: /node_modules/
        },
        {
            use: ["style-loader"],
            test: /\.css$/
        }]
    },
    devtool: "cheap-module-eval-source-map",
    devServer: {
        contentBase: path.join(__dirname, "public")
    }
}