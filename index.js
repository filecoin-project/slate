require('@babel/register')({
  presets: ['@babel/preset-env'],
  ignore: ['node_modules', '.next'],
});

module.exports = require('./server.js');
