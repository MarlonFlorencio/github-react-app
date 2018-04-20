'use strict'

const path = require('path')

module.exports = {
  entry: path.join(__dirname, '..', 'src', 'index'),

  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name]-[hash].js'
  },

  htmlPLuginConfig:{
    title: 'GitHub App',
    template: path.join(__dirname, '..', 'src', 'html', 'template.dev.html')
  },

  standardPreLoaders: {
    test: /\.js$/,
    exclude: /node_modules/,
    include: /src/,
    loader: 'standard'
  },

  jsLoaders: {
    test: /\.js$/,
    exclude: /node_modules/,
    include: /src/,
    loader: 'babel'
  },
  
  cssLoaders:{
    test: /\.css$/,
    exclude: /node_modules/,
    include: /src/,
    loaders: ['style', 'css']
  },
    
  resolve: {
    alias: {
      src: path.join(__dirname, '..', 'src'),
      utils: path.join(__dirname, '..', 'src', 'utils'),
      components: path.join(__dirname, '..', 'src', 'components')
    }
  }

}
