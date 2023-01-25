const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config({ path: './.env' });

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  mode: 'development',
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true,
    compress: true,
    // This is a necessary setting to ensure new front-end requests go to react routers
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, './build'),
      publicPath: '/',
    },
    proxy: {
      // Added back /api here to ensure that only requests to /api are sent to back end.
      // All front-end requests must be handled by react routers
      '/transfer': 'http://localhost:3000',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?/, //what files needs to be compiled by checking the file types
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env', 
              `@babel/preset-react`
            ],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader', 
          'css-loader', 
          'sass-loader'
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './client/index.html',
    }),
  ],
  resolve: {
    extensions: [ // Enable importing .js and .jsx files without specifying their extension
      '.js',
      '.jsx'
    ],
  },
};
