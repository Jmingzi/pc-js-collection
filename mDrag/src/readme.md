# mDrag.js
兼容ie8、可拖拽嵌套的定制化组件

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

### 拖拽思路
+ 主要是用的`mousedown` `mousemove` `mouseup`模拟的拖拽
+ 可拖拽的目标可以是源目标，也可以是目标本身
+ 拖动目标时，会首先克隆一个副本，并利用时间戳生成一个唯一的id，然后计算当前目标是在`源容器` `目标容器`还是`可嵌套的区块中`，利用`jquery`的`appendTo`或`before`或`after`方法，可以实现不重复的添加到指定的目标容器中去
+ 另外，嵌套的实现是创建了一个可以嵌套的拖拽源，它里面能放置拖拽目标，且该目标也能被拖拽

### 计算拖拽位置的实现思路
+ 每拖动一个目标，计算出该目标与目标容器的`offsetTop + offsetHeight/2`，然后用这个值与当前鼠标的`pageY`值做比较，它们之间的差值为diffTop
+ 要计算出此时离哪个目标最近，才可能将被推拽的放到该目标的前面或后面，将所有的diffTop放进一个数组，求绝对值最小值，得到数组索引，并判断正负，大于0即after，小于0即before，而索引正是该目标的位置