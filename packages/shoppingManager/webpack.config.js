var webpackConfigCreate = require('../../tools/webpack/webpack.config'),
  pack = require('./package.json'),
  webpackConfig = webpackConfigCreate(pack, __dirname, 'deployment/');

module.exports = webpackConfig;