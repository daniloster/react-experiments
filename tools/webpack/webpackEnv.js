module.exports = {
  isTest: process.env.NODE_ENV === 'test',
  isProd: process.env.NODE_ENV === 'production',
  isDev: process.env.NODE_ENV === 'dev'
};
