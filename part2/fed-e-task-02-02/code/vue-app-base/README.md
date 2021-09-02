# vue-app-base

1. 这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构
2. 有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）
3. 这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
4. 尽可能的使用上所有你了解到的功能和特性

## 说明

### `webpack.common.js`
配置打包入口: `entry: './src/main.js'`,
配置打包输出, 并且加上hash串
配置一系列loader处理文件, vue-loader处理vue文件, babel-loader处理js文件, url-loader处理图片,  less-loader, css-loader, style-loader处理样式文件, 同时加上thread-loader多线程打包优化执行速度, 该loader使用时需要预热, 降低初始化时间

使用 webpackBar显示打包进度条
使用 VueLoaderPlugin 处理vue文件, 能识别形如 ?vue&type=template 的 querystring，让不同语言的代码块匹配到对应的 rule
使用 HtmlWebpackPlugin 生成html文件, 同时注入模板参数

### 开发环境

配置mode和sourceMap, 同时配置devServer, 如果是正常开发, 还需要配置代理, 使用http2多路复用, 完全并行请求, 开启热更新

增加 HotModuleReplacementPlugin, 开启热替换

注意webpack5.x必须添加target: 'web', 否则热更新不成功(或者删去package.json中的browserslist, 但是这只是祛除了影响)

### 生产环境

optimization做优化, 开启css压缩, js压缩, ` usedExports: true, minimize: true`配合开启`tree-shaking`, `concatenateModules`开启作用域提升, 启用分包处理

每次打包之前需要清除原来的打包文件, 同时将favicon直接复制过去




