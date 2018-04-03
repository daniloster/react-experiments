const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const createResourcesLoaders = require('./webpackResourcesLoaders');
const getPlugins = require('./webpackPlugins');
const externals = require('./webpackExternals');
const env = require('./webpackEnv');
const applyDevMode = require('./webpackDev');

module.exports = function (pack, dirname, extraBundles = {}) {
  const webpackResourcesLoaders = createResourcesLoaders(dirname);
  const defaultEntry = {
    [pack.name]: env.isDev ? ['babel-polyfill', './DEV/index.js'] : './src/index.js',
  };
  const entry = Object.assign({}, defaultEntry, env.isDev ? extraBundles : {});
  /* eslint-disable */
  const webpackConfig = {
    output: {
      path: path.resolve(dirname, 'dist'),
      filename: '[name].js',
    },
    entry: entry,
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [
        path.resolve(dirname, 'node_modules'),
        path.resolve(dirname, '../../node_modules'),
        path.resolve(dirname),
        path.resolve(dirname, 'DEV'),
        path.resolve(dirname, 'src'),
      ],
    },
    plugins: getPlugins(extraBundles),
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    module: webpackResourcesLoaders.module,
  };
  /* eslint-enable */

  if (!env.isProd) {
    webpackConfig.devtool = 'source-map';
  }

  if (env.isDev) {
    applyDevMode(pack, webpackConfig);
  }

  if (env.isTest) {
    delete webpackConfig.entry;
    webpackConfig.target = 'node'; // in order to ignore built-in modules like path, fs, etc.
  }

  webpackConfig.externals = webpackConfig.externals.concat(externals);

  return webpackConfig;
};
