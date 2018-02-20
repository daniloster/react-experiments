const webpackConfigCreate = require('../../tools/webpack/webpack.config');
const pack = require('./package.json');
const webpackConfig = webpackConfigCreate(pack, __dirname, {
  'remote-store': ['babel-polyfill', './DEV/Sample/store.js'],
});

module.exports = webpackConfig;
