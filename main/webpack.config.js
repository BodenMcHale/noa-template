const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',

  // Output for the JavaScript bundle
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
  },

  // Change the default size warnings
  performance: {
    maxEntrypointSize: 1.5e6,
    maxAssetSize: 1.5e6,
  },

  devServer: {
    static: {                               
      directory: path.join(__dirname, './'),  
      watch: true
    },

    // Automatically open the development server in a new tab
    open: true,
  },

  // Gets rid of annoying Webpack stats
  stats: "minimal",

  // Make the development server polling use less CPU
  watchOptions: {
      aggregateTimeout: 500,
      poll: 1000,
      ignored: ["node_modules"],
  },

  plugins: [
      // new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'new_index.html'
      })
  ],
};