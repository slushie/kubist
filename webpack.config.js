const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: './src/main.js', // entry point of application
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Kubist',
      template: 'src/index.html'
    }), // generates index.html in our dist dir
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
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['babel-preset-env']
            }
          },
          {
            loader: 'standard-loader',
            options: {
              // Emit errors instead of warnings (default = false)
              error: false,
              // enable snazzy output (default = true)
              snazzy: true
              // other config options to be passed through to standard e.g.
              // parser: 'babel-eslint'
            }
          }
        ]
      },
      {
        test: /\.jsx/,
        exclude: /node_modules/,
        use: [
          {
            // transform JSX to javascript with mithril armour
            loader: 'babel-loader',
            options: {
              plugins: [
                ['transform-react-jsx', {pragma: 'm'}]
              ]
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  }
}
