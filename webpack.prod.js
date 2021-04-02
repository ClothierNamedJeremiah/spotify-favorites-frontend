/* eslint-disable import/no-extraneous-dependencies */
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');

/**
 * TODO: Bundle Split
 */
module.exports = merge(common, {
  mode: 'production',
  context: path.resolve(__dirname, './src'),
  entry: './index.js', // Where our application starts and where to start bundling our files

  /**
   * The module object helps define how your exported javascript modules are transformed
   * and which ones are included according to the given array of rules.
   */
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
          MiniCssExtractPlugin.loader, // This should be enabled in production
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
  // output: {
  //   filename: 'bundle.js',
  //   path: path.resolve(__dirname, 'dist'),
  //   publicPath: '/dist/', // the url to the output directory resolved relative to the HTML page
  //   clean: true,
  // },
  plugins: [
    new MiniCssExtractPlugin(),
  ],
  optimization: {
    minimizer: [
      '...',
      new CssMinimizerPlugin({
        test: /\.css$/i,
      }),
    ],
  },
});
