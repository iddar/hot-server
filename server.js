'use strict';

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware')

const config = require('./config/webpack.js');

const rootDir = path.resolve(__dirname);
const srcDir = path.join(rootDir, 'src');
const distDir = path.join(rootDir, 'dist');

const app = express();
const compiler = webpack(config);

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'src'));

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.use('/dist', express.static(distDir));
app.use('/build', express.static(path.join(rootDir, 'build')));

app.all('*', (req, res) => {
  res.sendFile('index.html', {
       root: srcDir
  });
});

app.listen(8000, '0.0.0.0', (err) => {
  if (err) return console.log(err);
  console.log('Listening at http://localhost:8000');
});
