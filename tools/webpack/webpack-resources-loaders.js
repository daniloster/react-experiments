var path = require('path'),
  webpack = require('webpack'),
  autoprefixer = require('autoprefixer'),
  env = require('./webpack-env'),

  styleLoader = ['style-loader'].concat(env.isProd ? '' : '?sourceMap').join(''),
  cssLoaderNoModules = [
    'css-loader?minimize&camelCase&modules&importLoaders=1&localIdentName=[local]'
  ].concat(
    env.isProd
      ? ''
      : '&sourceMap'
  ).join('')
  cssLoader = [
    'css-loader?minimize&camelCase&modules&importLoaders=1&localIdentName=[name]--[local]'
  ].concat(
    env.isProd
      ? ''
      : '&sourceMap'
  ).join(''),
  sassLoader = [
    'sass-loader'
  ].concat(
    env.isProd
      ? ''
      : '?sourceMap'
  ).join(''),
  postcssLoader = ['postcss-loader'].concat(env.isProd ? '' : '?sourceMap').join(''),
  resolveUrlLoader = ['resolve-url-loader'].concat(env.isProd ? '' : '?sourceMap').join(''),
  urlLoader = 'url-loader?limit=10000',
  fileLoader = 'file-loader',
  imgLoader = 'img-loader';

function createResourcesLoaders(dirname) {
  const sassOptions = {
    includePaths: [
      path.resolve(dirname, 'src'),
      path.resolve(dirname, 'node_modules'),
      path.resolve(dirname, 'node_modules', 'font-awesome', 'fonts'),
      path.resolve(dirname, '../../node_modules'),
      path.resolve(dirname, '../../node_modules', 'font-awesome', 'fonts'),
    ],
    data: '$fa-font-path: "font-awesome/fonts";'
  };
  return {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          enforce: "pre",
          loader: 'source-map-loader'
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            babelrc: false,
            presets: ['react', ["es2015", { "modules": false }], 'stage-0']
          }
        },
        {
          test: /\.(s?)css$/,
          include: [
            /src\//,
            /DEV\//,
            /packages\/((\w|\-|\d)+)\/lib\/(.*)/
          ],
          exclude: [/node_modules/],
          loaders: [
            {loader: styleLoader},
            {loader: cssLoader},
            {
              loader: sassLoader,
              options: sassOptions
            },
            { loader: postcssLoader, options: { plugins: function () { return [autoprefixer] } } }
          ]
        },
        {
          test: /\.(s?)css$/,
          include: [/node_modules/],
          use: [
            {loader: styleLoader},
            {loader: cssLoader},
            {
              loader: sassLoader,
              options: sassOptions
            }
          ]
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          use: [{loader: urlLoader}, {loader: imgLoader}]
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?(\?(\w|\d)+)?(\#(\w|\d)+)?$/,
          loader: [urlLoader, '&mimetype=image/svg+xml'].join('')
        },
        {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?(\?(\w|\d)+)?(\#(\w|\d)+)?$/,
          loader: [urlLoader, '&mimetype=application/font-woff'].join('')
        },
        {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?(\?(\w|\d)+)?(\#(\w|\d)+)?$/,
          loader: [urlLoader, '&mimetype=application/font-woff'].join('')
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?(\?(\w|\d)+)?(\#(\w|\d)+)?$/,
          loader: [urlLoader, '&mimetype=application/octet-stream'].join('')
        },
        {test: /\.eot(\?v=\d+\.\d+\.\d+)?(\?(\w|\d)+)?(\#(\w|\d)+)?$/, loader: fileLoader},
        {
          test: /\.json$/,
          loader: 'json-loader'
        }
      ]
    }
  };
}

module.exports = createResourcesLoaders;
