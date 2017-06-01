const webpack = require('webpack')
const { resolve } = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    // disable: process.env.NODE_ENV === "development"
})
const moduleEnv = process.env.module

module.exports = {
    entry: {
        [moduleEnv]: './' + moduleEnv + '/src/demo.js'
    },
    output: {
        path: resolve(__dirname, moduleEnv + '/demo'),
        filename: 'demo.vendor.js'
    },
    module: {
        noParse: /jquery/,
        
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [ { loader: "css-loader" }, { loader: 'sass-loader' } ]
                })
            },
            {
                test: /\.(png|gif)$/,
                use: "url-loader?limit=8192&name=[name].[ext]"
            }
        ]
    },
    plugins: [
        extractSass
    ]
}