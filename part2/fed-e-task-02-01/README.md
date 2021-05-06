## 简答题

**1、谈谈你对工程化的初步认识，结合你之前遇到过的问题说出三个以上工程化能够解决问题或者带来的价值。**

答:

随着前端应用功能要求的不断提高, 前端项目越做越大, 业务逻辑日益复杂, 直接就占了互联网行业的半边天, 从传统的H5, 到现在大型的SPA, 移动SPA, app, 小程序, exe, 前端基本上是无所不能的全面覆盖, 数年前的那种写demo, 在套模板调页面的方式, 属实有点跟不上时代的步伐。再这样的背景下, 前端工程化的出现就成了必然。

前端工程化主要就是遵循一定的标准和规范, 通过工具去提高效率, 降低成本, 保证质量的一种方式。

主要为了解决下面的问题:

+ 使用最新的ES标准编写JS时会出现代码不兼容的问题(JS代码兼容性问题)
+ 使用less/scss, postCss增强CSS编程性时运行环境不能直接支持(CSS增强和整合)
+ 模块化代码组织
+ 部署过程统一处理代码(压缩和上传到服务器这样的操作)
+ 统一开发成员的编程风格
+ 避免对后端依赖过大

价值: 

+ 创建项目过程中, 使用封装好的脚手架工具自动完成基础环境的搭建
+ 编码阶段使用eslint确保编程风格, 使用编译工具提高编码效率
+ web服务器热更新让开发体验更舒适
+ 使用git hooks自动检查项目, 检查风格和质量, 确保提交的代码没有问题
+ 用一行领命代替传统的ftp上传, 在代码阿提交过后通过自动化持续集成或者持续部署的方式自动部署到服务器(CI/CD等)

　

**2、你认为脚手架除了为我们创建项目结构，还有什么更深的意义？**

答:

不仅仅是创建项目的结构， 应该说是自动的创建新项目基础文件, 提供项目约定和规范, 做到标准统一。
在项目开发初期, 就可以为一个团队带来:

+ 相同的组织结构
+ 相同的开发范式
+ 相同的模块依赖
+ 相同的工具配置
+ 相同的基础代码
　

　

## 编程题

**1、概述脚手架实现的过程，并使用 NodeJS 完成一个自定义的小型脚手架工具**

一个脚手架工具就是一个node-cli应用, 创建脚手架工具就是创建一个node-cli应用, 我们首先创建一个文件夹, init一个package.json, 并且添加一个bin字段, 指定cli应用的入口文件

`cli.js`必须包含这个文件头`#! /usr/bin/env node`

node-cli应用入口必须有上述文件头(linux/macos/unix系统下必须将cli.js权限修改为>=755)

一般生成文件会根据模板去生成, 因此我们需要创建一个templates 目录, 在这个目录下新建一些模板

然后使用yarn link连接到全局, 通过yarn publish就可以发布了

当然, 一个脚手架的工作过程如下:

1. 通过命令行交互询问用户问题(在node中发起命令行交互询问需要使用 inquire模块, 询问的方式和Yeoman的prompt用法基本类似)
2. 根据用户回答的结果生成文件

```javaScript
#! /usr/bin/env node
// Node CLI应用入口文件必须要有一个这样的文件头

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");


inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'your project name?',
        default: "component"
    }
]).then(anwsers => {
    // 根据用户回答的结果生成文件
    // 模板目录
    const tmplDir = path.join(__dirname, 'templates');
    // 目标目录, 可以在node中通过process.cwd()方法得到这样一个目录的路径
    // process.cwd() 方法会返回 Node.js 进程的当前工作目录。
    const destDir = process.cwd();
    // 通过fs模块读取模板目录下的文件将他们全部转换到目标目录
    fs.readdir(tmplDir, (err, files) => {
        if (err) throw err;
        files.forEach(item => {
            // files是一个相对于templates下的相对路径
            // 通过模板引擎渲染这个路径的文件, 先安装一个EJS模板引擎
            // 参数依次是: 文件绝对路径, 模板引擎工作时的数据上下文, 回调函数
            ejs.renderFile(path.join(tmplDir, item), anwsers, (err, res) => {
                if (err) throw err;
                // 这里的res其实已经是结果了, 只需要通过文件写入的方式写入到目标目录就可以了
                // 目标目录需要做一个拼接, 内容就是读取模板后返回的结果
                fs.writeFileSync(path.join(destDir, item), res);
            })
        })
    })
})
```

　

**2、尝试使用 Gulp 完成项目的自动化构建**  ( **[先要作的事情](./notes/下载包是出错的解决方式.md)** )

(html,css,等素材已经放到code/pages-boilerplate目录)

说明文档:

要使用gulp自动化构建项目, 首先要安装插件, 所有插件的安装以及说明如下

```shell
# 先安装gulp, 有了gulp之后就新建gulpfile.js
yarn add gulp --dev

# 安装scss转换插件(开发依赖), 内部会安装node-sass
yarn add gulp-sass --dev

# 安装babel的gulp依赖(开发依赖)
yarn add gulp-babel --dev
# 安装babel核心模块和preset-env模块, env模块会将全部新的ES6+新特性进行转换
yarn add @babel/core @babel/preset-env --dev

# 模板文件转换文件(开发依赖)
yarn add gulp-swig --dev

# 添加图片转换依赖
yarn add gulp-imagemin --dev

# 添加文件删除插件(开发依赖), 他并不是gulp的插件, 主要还是gulp的任务并不是一定要通过src去找文件流, 也可以自己搞
yarn add del --dev

# 添加一个用于自动化添加插件的插件
yarn add gulp-load-plugins --dev

# 该模块提供一个包含热更新的开发服务器(开发依赖)
yarn add browser-sync --dev

# 安装useref插件
yarn add gulp-useref --dev

# 安装压缩html js 和css的插件
yarn add gulp-htmlmin gulp-uglify gulp-clean-css --dev

# 安装文件区分插件
yarn add gulp-if --dev

# 安装ssh插件, 部署时ssh到服务器使用
yarn add gulp-ssh --dev

# 安装检查js代码插件
yarn add jshint gulp-jshint --dev
```

　

## 说明：

首先, 由于插件过多, 因此需要自动导入`gulp-`开头的插件, 这里使用插件`gulp-load-plugins`, 也就有了如下代码:

```javaScript
const loadPlugins = require("gulp-load-plugins"); // 自动导入插件

const plugins = loadPlugins(); // 执行结果是一个对象, 对象内的成员就是gulp-开的插件取消gulp-, 只剩下后面的, 如果是xxx-xxx, 就是xxxXxx
```

然后整个任务需要使用到的gulp模块下的方法有`src`, `dest`, `series`, `parallel`, `watch`, 其中`src`用于产生流， 并且这个流应当从任务（task）中返回并发出异步完成的信号。其实就是一个写入流。`dest`用于导出一个写入流, 接收一个输出目录作为参数, 通常作为终止流。`series`和`parallel`都是用于构建组合任务, 前者是同步执行, 后者是最大并发执行。`watch`用于监听文件变化, 并且在变化后执行对应地任务。

`del`插件用于删除传入的目标文件

`browser-sync`用于创建一个网页静态资源服务器, 它提供了一个create方法创建一个服务器

`data`为传入的数据, `sshConfig`是ssh到的服务器配置, `staticPath`表示部署在服务器上的路径

### 基本私有任务说明

#### style

```javaScript
const style = () => {
    return src("src/assets/styles/*.scss", { base: 'src' })
        .pipe(plugins.sass({ outputStyle: 'expanded' }))
        .pipe(dest("temp"))
        .pipe(bs.reload({ stream: true }));
}
```

上述代码中, `src`接收两个参数, 第一个表示匹配的文件, 第二个是`src`函数执行时的配置项, 其中`base`属性表示生成文件的基准路径, 传入`src`, 则会将文件所在的地址原封不动的保留下来传入目标路径中, 这里就会转换成`目标路径/assets/styles/*.css`

`pipe`是流提供的一个函数, 接收的是对写入流的处理方法, 返回值还是一个文件流, 此处使用`gulp-sass`插件对`scss`文件做处理, 同时传入一个属性`outputStyle`表示将转换出来的文件完全展开(其实没有太大的必要, 这里是中间过程, 放在temp下, 方便观察, 后期放入dist中的还是要压缩), 同时sass会自动忽略`_(下划线)`开头的文件

`dest`接收一个输出路径, 导出一个终止流, 这里先放入中间路径`temp`中

`bs.reload({stream: true})`表示以流的方式往浏览器中推, 主要是当文件发生变化后重新执行style任务, 最后就会将输出的流推入浏览器中, 以更新浏览器。

#### lint

```javaScript
const lint = () => {
    return src("src/assets/scripts/*.js", { base: "src" })
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'))
}
```

`lint`任务用于检查js脚本, `src`使用和style一样, 接收一个`jshint()`方法用于检查写入流中的脚本, 同时通过`jshint.reporter("default")`直接输出到执行终端, 这里的`jshint()`方法来源于插件`gulp-jshint`, 但是这个插件还依赖于`jshint`, 主要用于检查js是否存在错误或者警告。

#### script

```javaScript
const script = () => {
    return src("src/assets/scripts/*.js", { base: "src" })
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'))
        .pipe(plugins.babel({ presets: ["@babel/preset-env"] }))
        .pipe(dest("temp"))
        .pipe(bs.reload({ stream: true }))
}
```

`src`作用和上面的style一样, 只是此处读取到的是js文件的写入流, 然后通过`babel`传入`@babel/preset-env`转换为ES5的代码, `@babel/preset-env`可以识别最新版本的JS代码, 当然, 也可以使用.babelrc进行js脚本的编译

`jshint`的作用和上面一样, 在于在转换之前先做一次检查

然后输出到temp中间目录, 并且监听到js文件变化后重新推流到浏览器中(热更新)

#### page

```javaScript
const page = () => {
    return src("src/**/*.html", { base: "src" })
        .pipe(plugins.swig({ data, defaults: { cache: false } }))
        .pipe(dest("temp"))
        .pipe(bs.reload({ stream: true }))
}
```

`src`的方式同上, 只不过这里拿到的是html文件, 使用插件`gulp-swig`用于解析swig模板引擎, 传入的data用于填入模板中, 在配置中将`cache`设置为`false`是阻止模板缓存导致页面不能及时更新(无法热更新), 导出到temp目录, 同时支持热更新。
#### image

```javaScript
const image = () => {
    return src("src/assets/images/**", { base: "src" })
        .pipe(plugins.imagemin())
        .pipe(dest("dist"))
}
```
使用src拿到图片的写入流, 这里将拿到所有类型的图片, 然后使用`gulp-imagemin`插件进行压缩和转换, 然后直接输出到dist中, 由于中间路径temp不需要对图片字体等静态资源做处理, 因此这里直接到dist中

#### font

```javaScript
const font = () => {
    return src("src/assets/fonts/**", { base: "src" })
        .pipe(plugins.imagemin())
        .pipe(dest("dist"))
}
```

字体文件和图片处理方式一致, 插件也是一样的, 该插件可以处理字体和图片

#### extra

```javaScript
const extra = () => {
    return src("public/**", { base: "public" })
        .pipe(dest("dist"))
}
```

public下的文件不需要做任何处理, 直接从public移动到dist中即可

#### clean

```javaScript
const clean = () => {
    return del(["dist", "temp"])
}
```
使用`del`插件清除需要清除的目录, 一般在build之前将上一次的build结果清除, 也可以单独执行, 这并不是一个私有任务, 后面会导出


#### cleanTemp


```javaScript
const cleanTemp = () => {
    return del(["temp"])
}
```

清除temp目录， build构建完成后不需要中间路径temp, 当执行此任务清除中间路径

#### cleanProd

```javaScript
const cleanProd = () => {
    return gulpProdSSH.shell(`rm -rf ${staticPath}`);
}
```

用于清除服务器上的资源, 在部署之前执行, 使用shell命令删除目标服务器的目标路径下的文件

#### serve

```javaScript
const serve = () => {
    watch("src/assets/styles/*.scss", style);
    watch("src/assets/scripts/*.js", script);
    watch("src/**/*.html", page);
    watch([
        "src/assets/images/**",
        "src/assets/fonts/**",
        "public/**"
    ], bs.reload);

    bs.init({
        server: {
            baseDir: ["temp", "src", "public"],
            routes: {
                "/node_modules": "./node_modules"
            },
        },
        open: true,
        notify: false,
        port: 9999,
    })
}
```

用于构建开发服务器, 主要是在开发环境使用, watch用于监听需要改变的文件, 前面是一个通配符, 第二参数是匹配的文件改变后需要执行的任务

scss, js, html文件都有对应地任务去执行, 而图片和字体等静态资源不需要进行额外的处理, 直接让浏览器更新一次即可。

`bs.init()`用于初始化浏览器, `server`是其核心配置, 主要配置`baseDir`, 使用数组操作, 表示文件获取的来源, 开发环境下直接从temp中获取js, css, html, 而图片等静态资源直接来自`src`和`public`目录, 这样减少一次构建过程, routes代表文件映射, 开发环境中的node_modules都映射到当前根路径下的node_modules中, 这样就不会找不到导致报错了。

`open`表示是否打开浏览器, `notify`表示是否开启启动提示, `port`表示本地开发服务器的端口号


#### useref

```javaScript
const useref = () => {
    return src("temp/*.html", { base: "temp" })
        .pipe(plugins.useref({ searchPath: ["dist", "."] }))
        .pipe(plugins.if(/\.js$/, plugins.uglify()))
        // htmlmin并不会默认删除换行符, 只删除空格, 需要指定选项, collapseWhitespace: 折叠换行符
        .pipe(plugins.if(/\.html$/, plugins.htmlmin({
            collapseWhitespace: true,
            minifyCSS: true, // 处理html中的css
            minifyJS: true // 处理html中的js
        })))
        .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
        // .pipe(dest("dist"))
        .pipe(dest("dist"))
}
```

`useref`任务主要是用于压缩文件, `gulp-useref`用于创建转换流, 自动将构建注释做一个指定的转换, 其中使用的插件是`gulp-useref`、`gulp-if`、`gulp-uglify`、`gulp-htmlmin`、`gulp-clean-css`

src还是获取写入流, 这里获取的是dist下的html模板的写入流, 因为转换的是html模板中的构建注释, 首先要找到文件, 一个文件在dist下, 一个在node_modules中, 因此需要传入`searchPath`的值是`["dist", "."]`, useref会自动修改html, 并且将内部的文件, 在读取流中创建新的文件, 因此, 还需要对node_modules下的大文件进行压缩, `if`会自动创建转换流， 并且根据传入的条件去确定是否执行对应地转换流, 第一个参数传入一个正则, \表示转义其后一位, 因此这里首先匹配的就是所有.js结尾的文件, 然后使用`uglify()`进行压缩, 这也是为什么要分出一个中间路径temp的原因, 如果不分, 那么写入的是dist, 读取的还是dist, 会造成混乱。

下一步是匹配所有的.html文件, 使用htmlmin进行压缩, 并且要收起所有的空格, 同时处理html中的js和css文件

下一步是匹配所有.css文件, 使用`gulp-clean-css`进行压缩, 将最终的文件流写入dist目录

#### gulpProdSSH

```javaScript
const gulpProdSSH = new plugins.ssh({
    ignoreErrors: false,
    sshConfig: sshConfig.ssh,
});
```

该任务主要是初始化一个访问服务器的ssh， 传入服务器的相关配置`sshConfig`

### 组合任务

#### compile

```javaScript
const compile = parallel(style, script, page);
```

核心任务compile, 几乎所有的组合任务都要以此为基准, 这里并发执行三个子任务, 主要是编译scss文件, 编译js文件和编译html模板, 由于先后并无影响, 因此直接并发执行即可

#### build

```javaScript
const build = series(clean, parallel(series(compile, useref), extra, image, font), cleanTemp);
```

build任务需要先clean, 完成后才能执行其他文件的构建, 在压缩之前要先完成基础构建, 因此有一个同步嵌套`series(compile, useref)`, 但是图片等其他静态资源不影响, 因此同步嵌套和extra image font可以并发执行, 最后在清除temp这个中间路径, 因为生产包不需要中间路径

#### dev

```javaScript
const dev = series(compile, serve);
```

主要是要先构建, 然后在初始化一个本地的开发web服务器

#### deploy

```javaScript
const deploy = series(build, cleanProd, () => src(["dist/**"]).pipe(gulpProdSSH.dest(staticPath)));
```
该任务主要是自动部署到服务器中, 使用src获取dist下的所有文件的写入流, 然后ssh到目标服务器后, 直接将写入流推入服务器上的目标路径, 完成修改, 当然, 在这之前要先build得到最新的dist, 然后再将服务器上原有的生产包清空

#### 导出任务

```javaScript
module.exports = {
    build,
    dev,
    deploy,
    lint,
    clean
}
```

此处导出五个任务, 一个构建生产包, 一个启动开发服务器, 一个自动部署, 一个校验js脚本是否存在错误, 最后一个用于清空本地文件

我理解的start和serve都是这里的dev, 主要用于开发环境

到此为止, 所有的说明完成




本次作业中的编程题要求大家完成相应代码后

- 提交一个项目说明文档，要求思路流程清晰。
- 或者简单录制一个小视频介绍一下实现思路，并演示一下相关功能。
- 说明文档和代码统一提交至作业仓库。