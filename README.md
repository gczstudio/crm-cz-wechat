# 前言

**Taro** 是一套遵循 [React](https://reactjs.org/) 语法规范的 **多端开发** 解决方案。现如今市面上端的形态多种多样，Web、React-Native、微信小程序等各种端大行其道，当业务要求同时在不同的端都要求有所表现的时候，针对不同的端去编写多套代码的成本显然非常高，这时候只编写一套代码就能够适配到多端的能力就显得极为需要。

使用 **Taro**，我们可以只书写一套代码，再通过 **Taro** 的编译工具，将源代码分别编译出可以在不同端（微信/百度/支付宝/字节跳动小程序、H5、React-Native 等）运行的代码。

如遇网络不佳，请移步[国内镜像加速节点](https://gitee.com/easytuan/taro-msparis)


# 技术栈

React + Taro + Taro UI + Dva + Sass + ES6/ES7

# 版本
  node  12.10.0
  Taro v1.3.34

## 项目运行

```
# 安装项目依赖
  yarn

# 项目启动
  yarn dev

# 项目打包
  yarn build

# pages模版快速生成
  yarn tep `文件名`

```

## 项目说明

目录结构

    ├── dist                   // 小程序编译结果目录
    ├── config                 // Taro配置目录
    │   ├── dev.js                 // 开发时配置
    │   ├── index.js               // 默认配置
    │   └── prod.js                // 打包时配置
    ├── src                    // 源码目录
    │   ├── components             // 组件
    │   ├── config                 // 项目开发配置
    │   ├── images                 // 图片文件
    │   ├── models                 // redux models
    │   ├── pages                  // 页面文件目录
    │   │   └── home
    │   │       ├── index.js           // 页面逻辑
    │   │       ├── index.scss         // 页面样式
    │   │       ├── model.js           // 页面models
    │   │       └── service.js        // 页面api
    │   ├── styles             // 样式文件
    │   ├── utils              // 常用工具类
    │   ├── app.js             // 入口文件
    │   └── index.html
    ├── package.json
    └── template.js            // pages模版快速生成脚本,执行命令 yarn tep `文件名`


# 文档

### Taro开发文档

> https://nervjs.github.io/taro/docs/README.html

### Taro UI开发文档

> https://taro-ui.aotu.io/#/

### dva开发文档地址

> https://dvajs.com/

### 微信小程序官方文档

> https://mp.weixin.qq.com/debug/wxadoc/dev/


# 问题

## ec-canvas 下的 echats.js文件 编译后会出现问题？

  config/index.js 下配置   
  ```
   weapp: {
      compile: {
        exclude: ['src/components/ec-canvas/echarts.js']
      }
    }
  ```

## 页面引入组件，编译报错 Path must be a string. Received null ？


## 微信小程序调取百度地图，预览模式调取不成功？
   1.在开发中配置request合法域名：https://apis.map.qq.com
   2.开发工具的本地设置中，去掉不校验合法域名

## taro-ui中textarea的placehodler和内容会出现悬浮？
   1.通过显示，隐藏的方法规避

## taro-ui中calandar组件使用node版本8.9.11时有问题，建议使用新一点node版本


   