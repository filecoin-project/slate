const regeneratorRuntime = require('regenerator-runtime');
require('electron-compile');
require('@babel/register')({
  presets: [[require.resolve('@babel/preset-env')]],
  ignore: ['node_modules', '.next'],
});

console.log('index.js ran');
module.exports = require('./server.js');
console.log('server.js ran');
