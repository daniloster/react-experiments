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
      sequences: true,
    },
    mangle: false,
    minimize: true,
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
      WEB_WORKER_RAPID7_LOG_TOKEN: JSON.stringify(process.env.WEB_WORKER_RAPID7_LOG_TOKEN),
    },
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      sourceMap: true,
    },
  }),
];

module.exports = function (extraBundles) {
  const nonProdPlugins = [
    new HtmlWebpackPlugin({
      excludeChunks: Object.keys(extraBundles),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        WEB_WORKER_RAPID7_LOG_TOKEN: JSON.stringify(process.env.WEB_WORKER_RAPID7_LOG_TOKEN),
      },
    }),
  ];
  return env.isProd ? prodPlugins : nonProdPlugins;
};
