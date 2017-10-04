const path = require('path');
const webpack = require('webpack');

let libraryName = 'ela';

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'lib'),
    filename: libraryName + '-ui.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
};
