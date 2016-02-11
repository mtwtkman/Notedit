var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: ['babel-polyfill', './app/main'],
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  target: 'electron'
}
