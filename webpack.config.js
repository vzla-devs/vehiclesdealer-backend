const nodeExternals = require('webpack-node-externals')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/api/index.ts',
  devtool: 'inline-source-map',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
}
