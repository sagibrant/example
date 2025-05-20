const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'source-map',      // ← full source maps
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',           // so dev-server serves from root
  },
  resolve: {
    alias: {
      // alias `octane-ui` to our src/ui folder
      'octane-ui': path.resolve(__dirname, 'src/ui'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],  // optional, if you want ES6+
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    // Copy & inject src/index.html → dist/index.html (with <script src="bundle.js">)
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
  devServer: {
    // static: {
    //     directory: path.resolve(__dirname, 'src'),
    // },
    static: {
        directory: path.resolve(__dirname, 'dist'),
    },
    compress: true,     // enable gzip
    hot: true,          // hot module replacement
    open: true,         // auto‑open in browser
    host: '127.0.0.1',
    port: 8089,
    devMiddleware: {
      publicPath: '/'
    }
  }
};
