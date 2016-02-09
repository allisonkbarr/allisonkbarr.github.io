
var path = require('path');
var webpack = require('webpack');

var extras = [
  'webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/only-dev-server'
]

module.exports = {
  devtool: 'eval',
  entry: [ './js/main.js' ].concat(extras),
  output: {
    path: path.join(__dirname, 'js'),
    filename: 'bundle.js',
    publicPath: ''
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
				test: /\.js/,
        exclude: /node_modules/,
				loader: 'babel?cacheDirectory,presets[]=stage-1&presets[]=es2015'
			},
			/*{
        test: /\.scss$/,
        loader: "style!css!resolve-url!sass?sourceMap",
				include: path.join(__dirname, 'src')
      },
      {
        test: /\.png$/,
        loader: "url?limit=100000"
      },
      {
        test: /\.jpg$/,
        loader: "file"
      }*/
		]
  }
};
