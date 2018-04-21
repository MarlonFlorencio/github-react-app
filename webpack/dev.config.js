'use strict'

const webpack = require('webpack')
const validate = require('webpack-validator')
const HtmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const common = require('./common')

module.exports = validate({
  devtool: 'source-map',

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    common.entry
  ],

  output: Object.assign({}, common.output, {
    publicPath: ''
  }),

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(),
    new HtmlPlugin(common.htmlPLuginConfig('template.dev.html'))
  ],

  module: {
    preLoaders: [common.standardPreLoaders],
    loaders: [common.jsLoaders, common.cssLoaders]
  },

  resolve: common.resolve

})
