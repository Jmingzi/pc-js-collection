## jquery-modal

es6环境使用
```js
import { alert, confirm, modal, custom } from 'modalAlert'

alert('hello world')
alert('hello world', ()=> console.log('confirm回调'))

confirm('hehe!~', '', ()=> console.log(111))

var modalInstance = modal.modal({
    selector: '#test',

    width: 500,
    height: 300,
    
    beforeShow() {
        console.log('before show')
    },
    afterShow() {
        console.log('after show')
    }
})

modalInstance.show()

custom({
    ...options  // 所有定制化的选项
})
```

非es6环境使用
```html
// css
<link rel="stylesheet" href="../dist/modal.css">
// jquery.js
<script src="jquery.js"></script>
// modal.js
<script src="../dist/modal.js"></script>

// modal.alert
// modal.confirm
```

#### 1.alert参数 

alert|参数名|描述
---|---|---
||msg|（必填）提示字符
||confirmCallback|（可选）点击确定的回调

#### 2.confirm参数  

confirm|参数名|描述
---|---|---
||msg|（必填）提示字符
||okText|（可选）确定文案
||ok|（可选）确定回调
||cancelText|（可选）取消文案
||cancel|（可选）取消回调

#### 3.modal参数  
modal接受2个参数：
+ modalParams   定制化modal的参数
+ alertParams   定制化alert，confirm的参数

modalParams|参数名|描述
---|---|---
||selector|（必填）选择器，例如：'#test','.test','test'，默认是id
||width|（可选）默认500
||height|（可选）默认300
||beforeShow|（可选）
||afterShow|（可选）

alertParams参数如下

#### 4.custom可定制化完整的参数说明表

参数名|默认值|描述
---|---|---
isModal|false|是否是modal
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
