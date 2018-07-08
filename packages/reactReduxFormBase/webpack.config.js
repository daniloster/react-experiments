var webpackConfigCreate = require('../../tools/webpack/webpack.config'),
  pack = require('./package.json'),
  webpackConfig = webpackConfigCreate(pack, __dirname);

module.exports = webpackConfig;