const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  target: 'node',
  entry: './src/main.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: pathData => {
      console.log(pathData)
      const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/')
      return `${filepath}/[name][ext]`
    },
  },
  node: {
    __dirname: false
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'assets', to: 'assets' },
        // the prebuilds for leveldb and secp256k1
        { from: 'node_modules/leveldown/prebuilds/linux-x64/', to: 'prebuilds/linux-x64/'},
        { from: 'node_modules/leveldown/prebuilds/win32-x64/', to: 'prebuilds/win32-x64/'}
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.node$/,
        loader: 'node-loader',
        options: {
          name: '[name].[ext]'
        },
      },
    ]
  },
}