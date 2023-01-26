const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// require('dotenv').config({ path: './.env' });

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
      '/api': 'http://localhost:3000',
    },
  },
  module: {
    rules: [
      {
        // Testing for any .js/.jsx files to be transpiled by Babel preset-react, and to transpile down
        // any ES6+ code down to version that can be compatible with any browser
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', `@babel/preset-react`],
          },
        },
      },
      {
        // Testing for any .css/.scss files so that webpack can fulfil the style import in 'index.js'
        test: /\.s[ac]ss$/i,
        exclude: /(node_modules)/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    // Generates an HTML file based on the template we pass in to serve our webpack files
    // which in this case, the template is our own 'index.html' file
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './client/index.html',
    }),
  ],
  resolve: {
    // Enable importing .js and .jsx files without specifying their extension
    extensions: ['.js', '.jsx'],
  },
};
