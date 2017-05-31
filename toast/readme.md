## toast.js

#### 使用
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

#### 非es6环境使用
```
// css
<link rel="stylesheet" href="../dist/toast.css">
// toast.js
<script src="../dist/toast.js"></script>

// toast.error('demo')
```