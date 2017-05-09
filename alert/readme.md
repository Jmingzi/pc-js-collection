## jquery-alert
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

#### alert参数 

alert|参数名|描述
---|---|---
||msg|（必填）提示字符
||confirmCallback|（可选）点击确定的回调

#### confirm参数  

confirm|参数名|描述
---|---|---
||msg|（必填）提示字符
||okText|（可选）确定文案
||ok|（可选）确定回调
||cancelText|（可选）取消文案
||cancel|（可选）取消回调

#### 可定制化完整的参数说明表

参数名|默认值|描述
---|---|---
hasTop|true|是否有头部
title|提示|提示文案
titleAlign|left|排列方式
hasClose|true|是否有关闭按钮
closeCallback|closeCallback() {}|关闭回调
msg|hello world|展示信息
hasBottom|true|是否有底部
confirmBtn||
||hasBtn|true|是否有该按钮
||bgColor|'#29BD8B'|按钮背景色
||bdColor|'#29BD8B'|按钮边框色
||color|#fff|按钮字体色
||text|确定|文案
||callback|callback() {}|回调
cancelBtn||
||hasBtn|true|是否有该按钮
||bgColor|'#fff'|按钮背景色
||bdColor|'#ccc'|按钮边框色
||color|#333|按钮字体色
||text|取消|文案
||callback|callback() {}|回调
otherBtn|[]|除了确定取消之外额外的按钮，按钮穿参同上
btnSequence|['cancelBtn', 'confirmBtn', 'otherBtn']|按钮展示顺序

