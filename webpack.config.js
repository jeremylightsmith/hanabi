const path = require('path');

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
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: [
          { loader: 'babel-loader', options: { presets: ['es2015', 'react', 'stage-2'] } }
        ]
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
