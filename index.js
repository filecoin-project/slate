require('@babel/register')({
  presets: [
    [require.resolve('@babel/preset-env')],
    [
      require.resolve('next/babel'),
      {
        'preset-env': {},
        'transform-runtime': {},
        'styled-jsx': {},
        'class-properties': {},
      },
    ],
  ],
  plugins: [[require.resolve('@babel/plugin-transform-runtime')]],
  ignore: ['node_modules', '.next'],
});

module.exports = require('./server.js');
