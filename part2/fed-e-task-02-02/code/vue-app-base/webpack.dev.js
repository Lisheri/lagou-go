const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');


module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  target: 'web',
  devServer: {
    http2: true,
    hot: true,
    open: true,
    port: 3000,
    publicPath: '/',
    contentBase: './dist',
    hotOnly:false,// 页面构建失败不刷新页面
    proxy: {
      // 如果需要代理, 此处不需要
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
