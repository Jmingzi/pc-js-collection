# LoadingShell
数据未加载时的样子。 

现在越来越多的app或webApp，如支付宝，今日头条，简书，知乎等都采用了这种形式。

![demo](./demo/demo.png)

### 使用
```js
import LoadingShell from './loadingShell.js'

const shell = new LoadingShell({
    cellNum: 3,
    htmlTpl: ''
})

shell.show()

setTimeout(()=> {
    shell.hide()
}, 3000)
```

### 参数说明

参数名|描述
----|-----
cellNum|{number} 3(default)，cell的数量
htmlTpl|{string} **单个**cell的html模版

如果是自定义cell模版即htmlTpl，插件也提供特定的类名以供使用，默认模版如下

```hmtl
<div class="loading-cell">
    <p class="list list-80 bg-gray animated"></p>
    <p class="list list-40 bg-gray animated duration-1"></p>
</div>
```

> 动画持续时间默认为0.5s，其中hide方法默认300ms后移除dom

### 样式表说明
类名|描述
----|-----
loading-cell|单个模版容器
bg-gray|背景色
list-80|宽度80%
list-60|宽度60%
list-40|宽度40%
animated|动画
duration-half|动画持续时间比默认多一半
duration-double|动画持续时间比默认多一倍
