const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const os = require('os');
const ThreadLoader = require('thread-loader');
const WebpackBar = require('webpackbar');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const workerPool = {
  workers: os.cpus().length,
  poolTimeout: 2000,
  workerParallelJobs: 200,
};

// 多进程预热
ThreadLoader.warmup(
  {
    ...workerPool,
  },
  [
    'babel-loader',
    'style-loader',
    'css-loader',
    'less-loader',
    'url-loader',
    'vue-loader'
  ]
);

module.exports = {
  entry: './src/main.js',
  output: { // output设置输出文件的配置, 该属性是一个对象
    filename: '[name]/index.[chunkhash].js', // 设置输出文件名称
    path: path.join(__dirname, 'dist'), // path执行文件输出所在的目录, 他必须使用绝对路径, 默认就是dist
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: ["thread-loader", {
          loader: "vue-loader",
        }],
      },
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: [
          "thread-loader", {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env']
            },
          }],
      },
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: ["thread-loader", 'style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false,
              limit: 5 * 1024, // limit 5kb
              name: '[name].[ext]',
              publicPath: '/',
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new WebpackBar(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: '学习',
      filename: 'index.html',
      template: './public/index.html',
      inject: 'body',
      templateParameters: { // 插入BASE_URL
        BASE_URL: `/`
      },
    }),
  ]
};
