const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const env = require('./webpack-env');

const styleLoader = {
  loader: 'style-loader',
  options: {
    sourceMap: !env.isProd
  }
};
const cssLoaderNoModules = {
  loader: 'css-loader',
  options: {
    minimize: true,
    camelCase: true,
    modules: true,
    importLoaders: true,
    localIdentName: '[local]',
    sourceMap: !env.isProd
  }
};
const cssLoader = {
  loader: 'css-loader',
  options: {
    minimize: true,
    camelCase: true,
    modules: true,
    importLoaders: true,
    localIdentName: '[name]--[local]',
    sourceMap: !env.isProd
  }
};
const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: function () {
      return [autoprefixer];
    },
    sourceMap: !env.isProd
  }
};
const resolveUrlLoader = {
  loader: 'resolve-url-loader',
  options: {
    sourceMap: !env.isProd
  }
};
const imgLoader = {
  loader: 'img-loader'
};
const fileLoader = {
  loader: 'file-loader'
};
function getUrlLoader(mimetype) {
  const urlLoader = {
    loader: 'resolve-url-loader',
    options: {
      limit: 10000
    }
  };

  if (mimetype) {
    urlLoader.options.mimetype = mimetype;
  }

  return urlLoader;
}

function createResourcesLoaders(dirname) {
  const sassOptions = {
    sourceMap: !env.isProd,
    includePaths: [
      path.resolve(dirname, 'src'),
      path.resolve(dirname, 'node_modules'),
      path.resolve(dirname, 'node_modules', 'font-awesome', 'fonts'),
      path.resolve(dirname, '../../node_modules'),
      path.resolve(dirname, '../../node_modules', 'font-awesome', 'fonts'),
    ],
    data: '$fa-font-path: "font-awesome/fonts";'
  };
  const sassLoader = {
    loader: 'sass-loader',
    options: sassOptions
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
          loaders: [styleLoader, cssLoader, sassLoader, postcssLoader]
        },
        {
          test: /\.(s?)css$/,
          include: [/node_modules/],
          use: [styleLoader, cssLoader, sassLoader]
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          use: [
            getUrlLoader(),
            imgLoader
          ]
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?(\?(\w|\d)+)?(\#(\w|\d)+)?$/,
          loader: getUrlLoader('image/svg+xml')
        },
        {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?(\?(\w|\d)+)?(\#(\w|\d)+)?$/,
          loader: getUrlLoader('application/font-woff')
        },
        {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?(\?(\w|\d)+)?(\#(\w|\d)+)?$/,
          loader: getUrlLoader('application/font-woff')
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?(\?(\w|\d)+)?(\#(\w|\d)+)?$/,
          loader: getUrlLoader('application/octet-stream')
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?(\?(\w|\d)+)?(\#(\w|\d)+)?$/,
          loader: fileLoader
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        }
      ]
    }
  };
}

module.exports = createResourcesLoaders;
