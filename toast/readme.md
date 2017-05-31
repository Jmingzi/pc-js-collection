## index.js
>es6风格语法

使用：
```js
import toast from 'toast'

toast.info('hello world')
toast.error('hello world', 3000)
toast.success()
toast.default()

// 参数说明：
// 第一个参数为字符
// 第二个为显示时间，默认为3s
```

非es6环境引入
+ 你需要将es6转换成es5
+ 你需要一个CommonJs环境 ／ 或者直接修改代码，将toast置为window下的方法

示例：
```js
if (typeof module !== 'undefined' && typeof exports === 'object' && define.cmd) {  
    module.exports = Toast
} else {  
    window.toast = Toast
}  
```

参考：  

[ES6-模块与-CommonJS-模块的差异](http://es6.ruanyifeng.com/#docs/module-loader#ES6-模块与-CommonJS-模块的差异)   
[es6简介](http://es6.ruanyifeng.com/#docs/intro)