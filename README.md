# pc-js-collection
#### web端js组件

+ [toast.js](./toast)　 
+ [jquery-modal.js](./alertModal)
+ [loading.js](./loading)


#### 关于demo打包

例如

```js
export module=alertModal&& webpack

export module=toast&& webpack
```

需要设置node环境变量module=`demo模块`，demo模块的结构：

```
./src
     ./index.js
./dist
./demo
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