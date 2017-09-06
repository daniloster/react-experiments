const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const env = require('./webpackEnv');

const prodPlugins = [
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
const nonProdPlugins = [
  new HtmlWebpackPlugin()
];

module.exports = env.isProd ? prodPlugins : nonProdPlugins;
