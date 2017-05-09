## alert
> es6语法

使用
```js
import { alert, confirm } from 'modalAlert'

alert('hello world')
alert('hello world', ()=> console.log('confirm回调'))

confirm('hehe!~', '', ()=> console.log(111))
```

非es6环境使用
+ 需要将代码编译成es5
+ 需要引入jquery，并reset基础样式

alert参数
alert|参数名|描述
---|---|---
|msg|（必填）提示字符
|confirmCallback|（可选）点击确定的回调

confirm参数
confirm|参数名|描述
---|---|---
|msg|（必填）提示字符
|okText|确定文案
|ok|确定回调
|cancelText|取消文案
|cancel|取消回调



