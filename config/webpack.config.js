module.exports = {
  module: {
    rules: [{
      test: /\.less$/i,loader:[
        'style-loader','css-loader','less-loader'
      ]
    }
    ]
  }
}