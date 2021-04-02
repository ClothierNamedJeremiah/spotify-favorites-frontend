/* eslint-disable import/no-extraneous-dependencies */

const ESLintPlugin = require('eslint-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './index.js',
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, 'public/template.html'),
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx'],
      failOnError: false,
    }),
  ],
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
    clean: true,
  },
};
