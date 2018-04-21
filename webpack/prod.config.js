'use strict'

const path = require('path')
const webpack = require('webpack')
const validate = require('webpack-validator')
const HtmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const crp = new ExtractTextPlugin('crp.css')
const styles = new ExtractTextPlugin('[name]-[hash].css')
const common = require('./common')

module.exports = validate({

  entry: common.entry,

  output: common.output,

  plugins: [
    styles,
    crp,

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),

    new webpack.optimize.DedupePlugin(),

    new webpack.optimize.OccurrenceOrderPlugin(),

    new HtmlPlugin({
      title: 'GitHub App',
      inject: false,
      template: path.join(__dirname, '..', 'src', 'html', 'template.html')
    })
  ],

  module: {

    preLoaders: [common.standardPreLoaders],

    loaders: [
      common.jsLoaders,
      {
        test: /\.css$/,
        exclude: /node_modules|(search|style)\.css/,
        include: /src/,
        loader: styles.extract('style', 'css')
      },
      {
        test: /(search|style)\.css$/,
        exclude: /node_modules/,
        include: /src/,
        loader: crp.extract('style', 'css')
      }
    ]
  },

  resolve: common.resolve

})
