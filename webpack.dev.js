/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');

/**
 * TODO: SourceMap for debugging
 */
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      { // Bundle JS and JSX
        test: /\.(js|jsx)$/, // condition to match files
        exclude: /(node_modules|bower_components)/, // condition to exclude files
        loader: 'babel-loader',
      },
      { // The order in which loaders are executed is from last to first
        test: /\.less$/i,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(svg)$/,
        loader: 'url-loader',
      },
    ],
  },
  devServer: {
    open: 'Google Chrome',
    clientLogLevel: 'info',
    contentBase: path.join(__dirname, 'public/'), // static file location
    port: 3000,
    publicPath: 'http://localhost:3000/dist/', // specifies the public URL of the the directory the bundled files will be available
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
