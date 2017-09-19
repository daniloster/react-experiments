const env = require('./webpackEnv');

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

module.exports = [
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
  }
];
