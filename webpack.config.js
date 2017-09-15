const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var production = process.env.NODE_ENV === 'production';

var config = {
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    modules: [
      'node_modules'
    ],
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: [
          { loader: 'babel-loader', options: { presets: ['es2015', 'react', 'stage-2'] } }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { '-autoprefixer': true } },
            { loader: 'resolve-url-loader' },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } }
          ]
        })
      }
    ]
  }
};

if (production) {
  config.devtool = 'source-map';
} else {
  config.devServer = {
    port: 5000,
    headers: { 'Access-Control-Allow-Origin': '*' }
  };
  config.output.publicPath = '//localhost:5000/webpack/';
  config.devtool = 'eval-source-map';
}

module.exports = config
