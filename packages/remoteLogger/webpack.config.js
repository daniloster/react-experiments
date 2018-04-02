const webpackConfigCreate = require('../../tools/webpack/webpack.config');
const pack = require('./package.json');
const webpackConfig = webpackConfigCreate(pack, __dirname);

module.exports = webpackConfig;
