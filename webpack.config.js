const webpack = require("webpack");
"use strict"

module.exports = () => ({
  entry: './server.js',	
  output: { path: __dirname, filename: 'index-jscript.js' },
  plugins: [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
    })
],
});
