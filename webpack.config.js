const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let libraryName = 'ela';

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'lib'),
    filename: libraryName + '-ui.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  devtool: false,

  module: {
    loaders: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            options: {minimize: true}
          }
        })
      }
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin({
      filename: libraryName + '-ui.css',
      disable: false,
      allChunks: true
    })
  ]
};
