const env = require('./webpackEnv');

module.exports = function(package, webpackConfig) {
  const DEV_PORT = package.devPort || 8000,
    DEV_HOST = 'localhost',
    DEV_URL = ['http://', DEV_HOST, ':', DEV_PORT, '/'].join('');


  if (env.isDev) {
    webpackConfig.externals = [];
    // Fix for loading fonts from font-awesome in DEV mode
    // development only
    webpackConfig.output.libraryTarget = 'umd';
    webpackConfig.output.publicPath = DEV_URL;
    webpackConfig.devServer = {
      // inline: true,
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
  return webpackConfig;
};
