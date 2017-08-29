var path = require('path');
var webpack = require('webpack');

module.exports = function createWebpackTestPackage(dirname, packageName) {
  return {
    entry: './src/index.js',
    output: {
      path: dirname,
      filename: 'dist/bundle.js',
      library: packageName,
      libraryTarget: 'umd'
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [
        path.resolve(dirname, 'src'),
        path.resolve(dirname, 'node_modules'),
        path.resolve(dirname, '../../node_modules')
      ]
    },
    module: {
      rules: [
        {
          test: /.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015', 'react']
          }
        }
      ]
    }
  };
};
