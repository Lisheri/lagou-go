# 编程题

#### 使用 NuxtJS 实现 RealWorld 全部功能

#### DEMO地址   https://demo.realworld.io/#/

**要求**

- 首先到 demo 地址注册一个自己的账号, 方便自己代码调测
- 实现功能包括: 注册/登录/退出、文章发表/修改/列表/分页/标签/详情/点赞/取消点赞、个人中心，个人信息更新
- 本作业需要 放在 **github** 个人仓库, 并且**实现自动化部署**
- 作业提交 「仓库代码地址」，在 README.md 中 输出「部署成功的服务器地址」

　　

**说明**

作业所需服务器, 可以到下面地址购买,  0.1元使用3个月 (需要拉勾学员电话号码注册)

 https://www.ucloud.cn/site/active/lagou.html

**( 购买时，要选择 CentOS 系统 )**

　

#### 可能出现问题 ( 建议提前做好 )

**服务器端口访问设置:  界面设置 + 服务器防火墙服务设置**

参考:  https://juejin.cn/post/6904234342575407111#heading-0

　　

**服务器上安装 nvm 和 node**

```shell
# 1)编辑文件  
vim  /etc/hosts

# 2)文件中添加内容
199.232.28.133  raw.githubusercontent.com

# 3)保存退出
ESC   :wq

# 4)在服务器上安装 nvm   参考: https://github.com/nvm-sh/nvm
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash

# 5)重启ssh终端后, 查看 nvm 版本
nvm --version

# 6)安装 Node.js lts 长期支持版
nvm install --lts
```

**服务器上安装 pm2**

```shell
npm i pm2 -g
```

pm2  list         查看应用列表

pm2  start      启动应用

pm2  stop      停止应用

pm2  reload   重载应用

pm2  restart   重启应用

pm2  delete    删除应用

pm2  log   xx   查看出错日志    xx为应用名称

**找不到 npm、pm2**

　