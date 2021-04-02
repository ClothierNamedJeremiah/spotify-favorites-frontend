/* eslint-disable import/no-extraneous-dependencies */
const ESLintPlugin = require('eslint-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const webpack = require('webpack');

/**
 * TODO: CSS Modules, SourceMap, Minifier, PostCSS Processor
 */
module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: './index.js',
  mode: 'development',
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
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
      components: path.resolve(__dirname, './src/components'),
      styles: path.resolve(__dirname, './src/styles'),
    },
    // directories where to look for modules (in order)
    extensions: ['.js', '.jsx', '.less'],
    preferAbsolute: true,
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/', // the url to the output directory resolved relative to the HTML page
    clean: true,
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
    new ESLintPlugin({
      extensions: ['js', 'jsx'],
      failOnError: false,
    }),
    new HTMLWebpackPlugin({
      // base: '/',
      // publicPath: '/',
      template: path.join(__dirname, 'public/template.html'),
    }),
  ],
};
