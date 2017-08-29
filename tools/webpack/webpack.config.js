var path = require('path'),
  webpack = require('webpack'),
  autoprefixer = require('autoprefixer'),
  HtmlWebpackPlugin = require('html-webpack-plugin');
nodeExternals = require('webpack-node-externals'),
  createResourcesLoaders = require('./webpack-resources-loaders'),
  env = require('./webpack-env');

module.exports = function (package, dirname) {
  var prodPlugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        booleans: true,
        conditionals: true,
        drop_console: true,
        drop_debugger: true,
        join_vars: true,
        screw_ie8: true,
        sequences: true
      },
      mangle: false,
      minimize: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.LoaderOptionsPlugin({
         options: {
           sourceMap: true
         }
       })
  ];
  var nonProdPlugins = [
    new HtmlWebpackPlugin()
  ];
  var webpackResourcesLoaders = createResourcesLoaders(dirname);
  var webpackConfig = {
    output: {
      path: path.resolve(dirname, 'dist'),
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
    plugins: (env.isProd ? prodPlugins : nonProdPlugins),
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    module: webpackResourcesLoaders.module,
  };

  var DEV_PORT = package.devPort || 4000,
    DEV_HOST = 'localhost',
    DEV_URL = ['http://', DEV_HOST, ':', DEV_PORT, '/'].join('');

  if (!env.isProd) {
    webpackConfig.devtool = 'source-map';
  }

  if (env.isDev) {
    webpackConfig.externals = [];
    // Fix for loading fonts from font-awesome in DEV mode
    // development only
    webpackConfig.output.libraryTarget = 'umd';
    webpackConfig.output.publicPath = DEV_URL;
    webpackConfig.devServer = {
      inline: true,
      port: DEV_PORT,
      stats: {
        title: 'DEV PAGE',
        showErrors: true,
        assets: false,
        chunks: true,
        chunkModules: false,
        colors: true,
        hash: false,
        timings: true,
        version: false
      }
    };
  }

  if (env.isTest) {
    delete webpackConfig['entry'];
    webpackConfig.target = 'node'; // in order to ignore built-in modules like path, fs, etc.
    webpackConfig.externals = webpackConfig.externals.concat([{
      'font-awesome': {
        amd: 'font-awesome',
        commonjs: 'font-awesome',
        commonjs2: 'font-awesome',
        root: 'FontAwesome'
      },
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
    }]);
  } else {
    webpackConfig.externals = webpackConfig.externals.concat({
      'font-awesome': {
        amd: 'font-awesome',
        commonjs: 'font-awesome',
        commonjs2: 'font-awesome',
        root: 'FontAwesome'
      },
    });
  }

  return webpackConfig;
};
