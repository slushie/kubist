const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/main.js', // entry point of application
  plugins: [
    new CleanWebpackPlugin(['dist']), // cleans dist folder
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
