const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  cache: true,
  optimization: {
    usedExports: true,
    minimize: true,
    concatenateModules: true,
    sideEffects: true, // production模式下自动开始
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      minSize: 30000,
      maxAsyncRequests: 80, // 异步加载代码时同时进行的最大请求数
      maxInitialRequests: 80,// 入口文件加载时最大同时请求数
    },
    minimizer: [
      new TerserPlugin({
        exclude: /node_modules/,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: false,
          cssProcessor: true, // 用于压缩和优化CSS 的处理器，默认是 cssnano.
          safe: true,
          discardComments: { removeAll: true },
          canPrint: false
        },
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./public/favicon.ico", to: "" },
      ],
    })
  ]
});
