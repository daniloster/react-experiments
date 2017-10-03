require('source-map-support').install({
  handleUncaughtExceptions: false,
  environment: 'node',
});
var path = require('path');

require('babel-register')({
  "babelrc": false,
  "presets": [["es2015", { "modules": false }], "react", "stage-0"],
  "plugins": [
    "transform-es2015-modules-umd",
    "transform-decorators-legacy",
    "transform-runtime",
    ["module-resolver", {
      "root": [
        path.resolve(process.cwd(), './node_modules'),
        path.resolve(process.cwd(), '../../node_modules')
      ]
    }]
  ],
  "ignore": function(filename) {
    var isIgnored = (/packages\/((\w|\d|\-)+)\/dist\//.test(filename) || (/packages\/((\w|\d|\-)+)\/lib\//.test(filename) || /node_modules/.test(filename)));
    return isIgnored;
  },
  "env": {
    "test": {
      "plugins": ["istanbul"]
    }
  }
});
require('babel-polyfill');
require('babel-regenerator-runtime');
