const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/main.js', // entry point of application
  plugins: [
    new HtmlWebpackPlugin({title: 'Kubist'}), // generates index.html in our dist dir
    new CleanWebpackPlugin(['dist']) // cleans dist dir
  ],
  output: {
    filename: 'bundle.js', // output file name
    path: path.resolve(__dirname, 'dist') // output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: ['babel-loader']
          // }
        }
      }
    ]
  }
};
