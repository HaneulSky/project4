const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
const webpack = require('webpack');
const { CleanWebpackPlugin } = require ('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';


module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },

      {
        test: /\.(jpg|jpeg|png|svg|webp)$/,
        use: 'file-loader?name=./images/[name].[ext]&esModule=false'
    },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./vendor/[name].[ext]'
      },
      {
        test: /\.css$/i,
        use: [
                        (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
                        {
                            loader:'css-loader',
                            options: {
                                importLoaders: 2
                            } 
                        }, 
                        'postcss-loader'
                ]
},
    ]
  },
    plugins: [
      new MiniCssExtractPlugin({ // 
        filename: 'style.[contenthash].css',
    }),
      new HtmlWebpackPlugin({
        inject: false,
        template: './src/index.html',
        filename: 'index.html'
    }),
      new WebpackMd5Hash(),
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
                preset: ['default'],
        },
        canPrint: true
   })
  ]
};