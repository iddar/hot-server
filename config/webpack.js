'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const distDir = path.join(rootDir, 'dist');

module.exports = {
  devtool: ['inline-source-map', 'eval'],
  entry: [
    'webpack-hot-middleware/client',
    path.join(srcDir, 'js', 'index.jsx')
  ],
  output: {
    path: distDir,
    filename: 'app.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loaders: ['babel'],
      include: path.join(srcDir, 'js')
    }, {
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(srcDir, 'js')
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract(
        // activate source maps via loader query
        'css?sourceMap!' +
        'less?sourceMap'
      ),
      include: path.join(srcDir, 'css')
    }]
  }
};
