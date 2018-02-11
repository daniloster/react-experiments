const path = require('path');
const autoprefixer = require('autoprefixer');
const env = require('./webpackEnv');

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
function getSassLoader(dirname, isProd) {
  const sassOptions = {
    sourceMap: !isProd,
    includePaths: [
      path.resolve(dirname, 'src'),
      path.resolve(dirname, 'node_modules'),
      path.resolve(dirname, 'node_modules/font-awesome/css'),
      path.resolve(dirname, 'node_modules/font-awesome/fonts'),
      path.resolve(dirname, '../../node_modules'),
      path.resolve(dirname, '../../node_modules/font-awesome/css'),
      path.resolve(dirname, '../../node_modules/font-awesome/fonts')
    ],
    data: '$fa-font-path: "font-awesome/fonts";'
  };
  return {
    loader: 'sass-loader',
    options: sassOptions
  };
}

function createStyleLoaders(dirname) {
  const sassLoader = getSassLoader(dirname, env.isProd);

  return [
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
    }
  ];
}

module.exports = createStyleLoaders;
