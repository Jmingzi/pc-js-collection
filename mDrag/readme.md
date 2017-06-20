# mDrag.js
兼容ie8、可嵌套拖拽的定制化组件

### 使用
```js
import $ from 'jquery'
import Mdrag from './mDrag'
import './mDrag.scss'

new Mdrag({
    // 必填，拖拽源容器
    dragFromBox: $('.mDrag-from'),
    
    // 必填，拖拽目标容器
    dragToBox: $('.mDrag-to'),
    
    // 选填，显示删除按钮条件，返回boolean值
    delShowCondition(dragItem) {
        // console.log(dragItem)
        return true
    },
    
    // 选填
    beforeDel(dragItem) {
        console.log('beforeDel')
    },
    
    // 选填
    afterDel(dragItem) {
        console.log('afterDel')
    },
    
    // 选填
    beforeDrag(dragItem) {
        console.log('beforeDrag')
    },
    
    // 选填
    afterDrag(dragItem) {
        // console.log(dragObj)
        console.log('afterDrag')
    }
})
```

### 必要的html结构说明
1、容器
```html
<div class="mDrag-from"></div>
<div class="mDrag-to"></div>
```

2、拖拽item
> 非嵌套item
```html
<div class="mDrag-item number" data-component="number">
    <div class="del-drag">&times;</div>
</div>
```
> 可嵌套item
```html
<div class="mDrag-item block" data-component="block">
    <div class="block-container">block</div>
    <div class="del-drag">&times;</div>
</div>
```

3、属性说明  

属性名|必填值|说明  
----|----|----  
class|mDrag-item [componentName]|mDrag-item必须，另外如果是可嵌套，itemName必须为block；其它自定义  
data-component|block/自定义|唯一标识item的属性  
 
### 拖拽思路
+ 主要是用的`mousedown` `mousemove` `mouseup`模拟的拖拽
+ 可拖拽的目标可以是源目标，也可以是目标本身
+ 拖动目标时，会首先克隆一个副本，并利用时间戳生成一个唯一的id，然后计算当前目标是在`源容器` `目标容器`还是`可嵌套的区块中`，利用`jquery`的`appendTo`或`before`或`after`方法，可以实现不重复的添加到指定的目标容器中去
+ 另外，嵌套的实现是创建了一个可以嵌套的拖拽源，它里面能放置拖拽目标，且该目标也能被拖拽

### 计算拖拽位置的实现思路
+ 每拖动一个目标，计算出该目标与目标容器的`offsetTop + offsetHeight/2`，然后用这个值与当前鼠标的`pageY`值做比较，也就是比较该目标的Y轴中心线与当前鼠标的pageY值，它们之间的差值为diffTop
+ 要计算出此时离哪个目标最近，才可能将被推拽的放到该目标的前面或后面，所以遍历目标容器，将所有的diffTop放进一个数组，求绝对值最小值，得到数组索引，并判断正负，大于0即after，小于0即before，而索引正是该目标的位置


