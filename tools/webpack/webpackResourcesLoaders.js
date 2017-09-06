const env = require('./webpackEnv');
const imageAndFontLoaders = require('./webpackImageAndFontLoaders');
const createStyleLoaders = require('./webpackCreateStyleLoaders');

const sourceMapLoader = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  enforce: 'pre',
  loader: 'source-map-loader'
};
const babelLoader = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  query: {
    babelrc: false,
    presets: ['react', ['es2015', { 'modules': false }], 'stage-0']
  }
};
const jsonLoader = {
  test: /\.json$/,
  loader: 'json-loader'
};

function createResourcesLoaders(dirname) {

  return {
    module: {
      rules: imageAndFontLoaders.concat([
        sourceMapLoader,
        babelLoader,
        jsonLoader
      ])
      .concat(createStyleLoaders(dirname))
    }
  };
}

module.exports = createResourcesLoaders;
