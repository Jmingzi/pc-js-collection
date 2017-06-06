# web-js-collection
#### web端js组件

+ [Toast](./toast)  消息提示 
+ [AlertModal](./alertModal)  集成alert、confirm、modal，一切皆可定义
+ [Loading](./loading)  加载loading
+ [LoadingShell](./loadingShell)    更友好的loading
+ [Mdrag](./mDrag)    兼容ie8的可嵌套拖拽的定制化组件


#### 关于demo打包

例如

```
export module=alertModal&& webpack
export module=toast&& webpack
export module=loading&& webpack
export module=loadingShell&& webpack
```

需要设置node环境变量module=`demo模块`，demo模块的结构：

```
[module]
├── demo
│   ├── demo.vendor.js   打包后的demo.js
│   ├── index.html       demo.html
│   └── [module].css     模块css
├── readme.md
└── src
    ├── demo.js          demo 入口文件  必须
    ├── [module].js      模块.js       必须 
    └── [module].scss    模块.scss     可选
```

#### 关于模块化插件写法

示例
```js
if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = exportToast
} else {
    window.toast = exportToast
}
```

参考 

[ES6-模块与-CommonJS-模块的差异](http://es6.ruanyifeng.com/#docs/module-loader#ES6-模块与-CommonJS-模块的差异)   
[es6简介](http://es6.ruanyifeng.com/#docs/intro)

#### 第三方常用库

[storage]

+ [web-storage-cache](https://github.com/WQTeam/web-storage-cache)