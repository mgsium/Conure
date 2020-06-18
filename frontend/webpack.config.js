const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  watch: false,
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
      {
        test: /\.css$/,
        use: [
            "css-loader"
        ]
      },
      { 
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000' 
      },
      {
        test: /\.(png|svg|jpg|gif|ico|PNG)$/,
        use: [
          'file-loader',
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: "./public/assets/img/ico/favicon.ico"
    }),
  ] 
}