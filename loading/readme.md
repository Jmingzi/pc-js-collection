### 关于loading轮子  

![demo](demo/loading.png)  

使用

```html
import loading from './loading.js'

loading.show()

setTimeout(()=> {
    loading.hide()
}, 3000)
```

非es6环境使用
+ 需要全局引入jquery
+ 需要将 src下的 源码转化为es5，并加入非CommonJs规范语句，全局引入即可

方法

```js
loading.show()

loading.hide()
```