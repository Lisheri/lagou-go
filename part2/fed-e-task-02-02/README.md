# 一、简答题

#### 1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。

1. 配置初始化, 读取配置文件(或者命令行参数), 加载对应的配置文件
2. 定位打包入口
3. 实例化compiler, 注册钩子, 挂载options, 设置文件读写和监听能力, 挂载plugins, 处理内部插件
4. 调用compiler方法, 实例化一个compilation对象, 实例化模块工厂, 创建processDependenciesQueue实例, 内部维系一个队列, 作为调度中心(5.x), 触发make钩子监听
5. 执行compilation.addEntry方法, 通过上面的processDependenciesQueue依次调度 addModuleQueue, factorizeQueue和buildQueue, 完成模块从入口配置到执行resolve, 完成loader的配置读取, 解析与合并。
6.  执行runLoaders处理源码, 得到一个编译后的字符串或者Buffer, 将文件解析成AST, 分析module间的依赖关系, 递归解析依赖文件
7.  生成chunks, 实例化chunk并生成chunk graph, 设置 module id,  chunk id以及hash等
8.  使用不同的template渲染chunk资源
9.  创建目标文件夹以及目标文件, 并将资源写入并打印构建信息

　

　

#### 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。

1. 不同:

loader专注于实现资源模块的加载, 从而实现整体项目的打包, 而插件通过触发compiler的钩子监听解决除了资源模块加载之外的其他自动化工作。

2. 开发思路

+ loader:
>实际上loader就是让资源文件从输入到输出的一个转换(转换代码), 他是一个管道, 比如说css-loader -> style-loader, 对于同一个文件可以多次使用同一个loader, 因此我们开发一个loader要做的事情很简单, 就是开发这个管道, 让资源文件进入, 处理后在流出即可

+ Plugin工作原理:
>插件其实就是通过在生命周期的钩子中挂载函数来实现扩展(挂载的是compiler的钩子, 在创建compiler实例时初始化的一系列钩子)
>webpack要求编写的插件必须是一个函数, 或者是一个包含apply方法的对象。一般都会将插件定义为一个类, 然后再这个类中定义apply方法, 使用的时候就new一个实例来使用
>apply方法入参就是compiler实例, 通过监听一个compiler上的钩子(回调函数的参数时compilation实例, compilation从addEntry开始, 就不停的被挂在了各种各样的关于构建的信息), 当这些钩子监听被触发的时候, 就会执行插件中的回调函数, 通过将回调函数挂载到compiler的各个钩子上, 我们可以直接在webpack构建的各种生命周期中, 去执行我们设置的回调, 来处理文件。



　

# 二、编程题

#### 1、使用 Webpack 实现 Vue 项目打包任务

具体任务及说明：

1. 在 code/vue-app-base 中安装、创建、编辑相关文件，进而完成作业。
2. 这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构
3. 有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）
4. 这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
5. 尽可能的使用上所有你了解到的功能和特性



**提示：(开始前必看)**

在视频录制后，webpack 版本以迅雷不及掩耳的速度升级到 5，相应 webpack-cli、webpack-dev-server 都有改变。

项目中使用服务器的配置应该是改为下面这样：

```json
// package.json 中部分代码
"scripts": {
	"serve": "webpack serve --config webpack.config.js"
}
```

vue 文件中 使用 style-loader 即可

其它问题, 可先到 https://www.npmjs.com/ 上搜索查看相应包的最新版本的配置示例, 可以解决大部分问题.



#### 作业要求

本次作业中的编程题要求大家完成相应代码后

- 提交一个项目说明文档，要求思路流程清晰。
- 或者简单录制一个小视频介绍一下实现思路，并演示一下相关功能。
- 最终将录制的视频或说明文档和代码统一提交至作业仓库。