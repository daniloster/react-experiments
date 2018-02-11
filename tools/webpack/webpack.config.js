const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const createResourcesLoaders = require('./webpackResourcesLoaders');
const plugins = require('./webpackPlugins');
const externals = require('./webpackExternals');
const env = require('./webpackEnv');
const applyDevMode = require('./webpackDev');

module.exports = function (package, dirname, preDistPath) {
  const webpackResourcesLoaders = createResourcesLoaders(dirname);
  const outputPath = path.join(preDistPath || '', 'dist');
  const webpackConfig = {
    output: {
      path: path.resolve(dirname, outputPath),
      filename: '[name].js'
    },
    entry: {
      [package.name]: env.isDev ? ['babel-polyfill', './DEV/index.js'] : './src/index.js'
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [
        path.resolve(dirname, 'node_modules'),
        path.resolve(dirname, '../../node_modules'),
        path.resolve(dirname),
        path.resolve(dirname, 'DEV'),
        path.resolve(dirname, 'src')
      ],
    },
    plugins: plugins,
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    module: webpackResourcesLoaders.module,
  };

  if (!env.isProd) {
    webpackConfig.devtool = 'source-map';
  }

  if (env.isDev) {
    return applyDevMode(package, webpackConfig);
  }

  if (env.isTest) {
    delete webpackConfig['entry'];
    webpackConfig.target = 'node'; // in order to ignore built-in modules like path, fs, etc.
  }

  webpackConfig.externals = webpackConfig.externals.concat(externals);

  return webpackConfig;
};
