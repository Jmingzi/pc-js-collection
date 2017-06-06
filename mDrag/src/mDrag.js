import $ from 'jquery'

if (!window.console) {
    window.console = {
        log() {}
    }
}

export default class YmDrag {
    constructor(params) {
        this.opts = params
        this.body = $('body')

        this.bindEvents()
    }

    /**
     * @param box
     * @returns {{boxLeft: (number|*), boxRight: *, boxTop: (number|*), boxBottom: *}}
     * @private
     */
    _getBoxOffset(box) {
        return {
            boxLeft: box.offset().left,
            boxRight: box.offset().left + box.width(),
            boxTop: box.offset().top,
            boxBottom: box.offset().top + box.height()
        }
    }

    /**
     * 是否在fromBox、toBox、或者区块中
     * @param type      判断的盒子
     * @param pageX     鼠标x坐标
     * @param pageY     鼠标y坐标
     * @returns {*}     如果在区块中，则返回此时所在的区块，其它返回boolean
     * @private
     */
    _isInBox(type, pageX, pageY) {
        let box = null,
            block = [],
            that = this

        if (type === "block") {
            const dragged = this.opts.dragToBox.find(".block.dragged")
            // console.log("区块数量：" + dragged.length)

            for (let i = 0; i < dragged.length; i++) {
                box = $(dragged[i])

                const { boxLeft, boxRight, boxTop, boxBottom } = that._getBoxOffset(box)
                if (pageX >= boxLeft && pageX < boxRight && pageY >= boxTop && pageY < boxBottom) {
                    return box
                }
            }

            return false
        } else if (type === "from") {
            box = this.opts.dragFromBox
        } else if (type === "to") {
            box = this.opts.dragToBox
        }

        const { boxLeft, boxRight, boxTop, boxBottom } = that._getBoxOffset(box)
        return  pageX >= boxLeft && pageX < boxRight && pageY >= boxTop - 50 && pageY < boxBottom
    }

    _addTargetMark(pageY, blockElement) {
        let targetLine = this.body.find(".target-line"),
            data = this._computeMovePosition(pageY, blockElement),
            targetDom = null

        if (blockElement) {
            targetDom = blockElement.find(".mDrag-item").eq(data.index)
        } else {
            targetDom = this.opts.dragToBox.children(".mDrag-item").eq(data.index)
        }

        //创建line
        if (targetLine.length !== 0) {
            targetLine.remove()
        } else {
            targetLine = $('<div></div>').addClass("target-line").css('display', 'block')
        }

        if (data.fx === 'after') {
            targetDom.after(targetLine)
        } else {
            targetDom.before(targetLine)
        }
    }

    _computeMovePosition(pageY, blockElement) {
        let me = this,
            dragItems = null

        // console.log(blockElement ? ("区块中item数量：" + blockElement.find(".mDrag-item").length) : ("母盒子item数量：" + me.opts.dragToBox.children(".mDrag-item").length));
        if (blockElement) {
            dragItems = blockElement.find(".mDrag-item")
        } else {
            dragItems = this.opts.dragToBox.children(".mDrag-item")
        }

        let diffTop = 0, itemLen = dragItems.length, itemHeightArr = []
        dragItems.each(function (i) {
            // 子元素逐个对比高度
            if (itemLen === 1) {
                // 只有一个子元素时
                diffTop = 0
            } else {
                // 当含有2个以上的子元素时，
                // 当前的pageY与前一个子元素的高度差
                diffTop = pageY - me.opts.dragToBox.offset().top

                if (i < itemLen-1) {
                    // 计算offsetTop + 自身高度的一半
                    let halfTop = $(this).offset().top - me.opts.dragToBox.offset().top + $(this).outerHeight(true) / 2
                    itemHeightArr.push(halfTop)
                }
            }
        })

        // 判断当前的高度差
        return this._compareTop(diffTop, itemHeightArr)
    }

    _compareTop(diffTop, itemTopArr) {
        let data = {
            index: 0,
            fx: 'before'
        }
        let min = 0, fall = []

        // if (arr.length == 0) {}
        if (itemTopArr.length === 1 && diffTop - itemTopArr[0] > 0) {
            data.fx = 'after'
        } else if (itemTopArr.length > 1) {
            fall = itemTopArr.map(item=> diffTop - item)
            // 先找到最小值
            min = fall[0]

            fall.forEach(item=> {
                if (Math.abs(item) < Math.abs(min)) {
                    min = item
                }
            })

            // 找到最小值的下标，以及符号
            data.index = fall.findIndex(item=> item === min)
            data.fx = min > 0 ? 'after' : 'before'
        }
        return data
    }

    _setCurrent(item) {
        this.opts.dragToBox.find(".mDrag-item").removeClass('curr-edit')
        item.addClass('curr-edit')

        if (typeof this.opts.afterDrag === 'function') {
            this.opts.afterDrag(item)
        }
    }

    bindEvents() {
        let me = this,

            // 是否可以移动
            _move = false,

            // 是否移动过
            isMoved = false,

            // 移动时的x
            _moveX,

            // 移动时的y
            _moveY,

            // 鼠标按下的x
            _downX,

            // 鼠标按下的y
            _downY,

            // 当前选中的控件
            dragCurrNode,

            // 控件副本
            cloneDragNode

        // 控件盒子 拖拽绑定
        this.opts.dragFromBox.on({
            click(e) {
                e.stopPropagation()
            },
            mousedown(e) {
                e.stopPropagation()

                if (e.button === 0) {
                    _move = true

                    dragCurrNode = $(this)
                    dragCurrNode.fadeTo(20, 0.5)

                    _downX = e.pageX - parseInt(dragCurrNode.offset().left)
                    _downY = e.pageY - parseInt(dragCurrNode.offset().top)

                    cloneDragNode = dragCurrNode.clone()
                    // 加上时间戳，唯一标识name
                    cloneDragNode.attr("data-component",
                            cloneDragNode.attr('data-component') + "-" + (new Date()).getTime())

                    if (typeof me.opts.beforeDrag === 'function') {
                        me.opts.beforeDrag(cloneDragNode)
                    }
                }
            }
        }, '.mDrag-item')

        // 目标盒子 拖拽绑定
        this.opts.dragToBox.on({
            click(e) {
                e.stopPropagation()

                me._setCurrent($(this))
            },
            mousedown(e) {
                e.stopPropagation()

                if (e.button === 0) {
                    _move = true

                    dragCurrNode = $(this)
                    dragCurrNode.fadeTo(20, 0.5)

                    _downX = e.pageX - parseInt(dragCurrNode.offset().left)
                    _downY = e.pageY - parseInt(dragCurrNode.offset().top)

                    cloneDragNode = dragCurrNode.clone()

                    if (typeof me.opts.beforeDrag === 'function') {
                        me.opts.beforeDrag(cloneDragNode)
                    }
                }
            },
            mouseover(e) {
                e.stopPropagation()

                $(this).addClass("hover")
                if (me.opts.delShowCondition && me.opts.delShowCondition($(this))) {
                    $(this).find('.del-drag').css('display', 'block')
                }
            },
            mouseout(e) {
                e.stopPropagation()

                $(this).removeClass("hover")
                $(this).find('.del-drag').css('display', 'none')
            }
        }, '.mDrag-item')

        // 控件删除
        this.opts.dragToBox.on({
            mousedown(e) {
                e.stopPropagation()
            },
            click(e) {
                e.stopPropagation()
                if (typeof me.opts.beforeDel === 'function') {
                    me.opts.beforeDel(cloneDragNode)
                }

                $(this).parent().remove()

                if (typeof me.opts.afterDel === 'function') {
                    me.opts.beforeDel(cloneDragNode)
                }
            }
        }, '.del-drag')

        // move监听
        $(document).on({
            mousemove(e) {
                e.stopPropagation()

                if (e.button === 0 && _move) {
                    isMoved = true
                    _moveX = e.pageX - _downX
                    _moveY = e.pageY - _downY

                    let blockElement = null

                    // 判断移动时处于目标盒子
                    if (me._isInBox("from", _moveX, _moveY)) {
                        cloneDragNode.attr("data-nowBox", "from")

                        // 不存在 则添加
                        cloneDragNode.appendTo( me.opts.dragFromBox )
                        // console.log("from");
                    } else if (me._isInBox("to", _moveX, _moveY)) {

                        // 不是区块的item 才进行位置判断
                        if (!cloneDragNode.hasClass("block")) {
                            blockElement = me._isInBox("block", _moveX, _moveY)
                        }
                        // console.log(blockElement)

                        if (blockElement) {

                            // console.log("在区块中");
                            cloneDragNode.appendTo(blockElement.find(".block-container"))

                            // 添加目标线
                            me._addTargetMark(_moveY, blockElement)
                            cloneDragNode.attr("in-block", "block")
                        } else {
                            // console.log("不在区块中");
                            // 不存在 则添加
                            cloneDragNode.appendTo(me.opts.dragToBox)

                            // 添加目标线
                            me._addTargetMark(_moveY)
                            cloneDragNode.attr("in-block", "none")
                        }

                        cloneDragNode.attr("data-nowBox", "to")
                    } else {
                        // console.log("既不是from，也不是to，也不是block");
                        cloneDragNode.removeAttr("data-nowBox")
                    }

                    // 位置变化
                    cloneDragNode.css({ 'visibility': "visible", top: _moveY, left: _moveX}).
                    removeClass("curr-edit").addClass("draging")
                    // console.log("----> move end");
                }
            },
            mouseup(e) {
                e.stopPropagation()

                if (e.button === 0 && _move) {
                    _move = false
                    dragCurrNode.fadeTo("fast", 1)

                    if (isMoved) {
                        isMoved = false
                        _moveX = e.pageX - _downX
                        _moveY = e.pageY - _downY

                        let temp, blockElement

                        // 判断拖放到那个盒子
                        if (!me._isInBox("to", _moveX, _moveY)) {
                            // console.log("不在dragToBox中，被移除")
                            cloneDragNode.remove()
                        } else {
                            // 判断拖放的目标对象
                            blockElement = me._isInBox("block", _moveX, _moveY)

                            if (blockElement) {
                                // console.log("鼠标在区块中");
                                temp = blockElement.find('.mDrag-item')

                                if (cloneDragNode.hasClass("block")) {
                                    // 如果 dragCurrNode == blockElement 是区块本身
                                    blockElement.after(cloneDragNode)
                                    cloneDragNode.find(".mDrag-item").removeClass('curr-edit')
                                } else if (temp.length > 1) {
                                    // 计算目标位置
                                    let data = me._computeMovePosition(_moveY, blockElement)
                                    temp = temp.eq(data.index)
                                    temp[data.fx](cloneDragNode)
                                } else {
                                    temp.before(cloneDragNode)
                                }
                            } else {
                                // console.log("鼠标不在区块中");
                                temp = me.opts.dragToBox.children('.mDrag-item')

                                if (temp.length > 1) {
                                    // 计算目标位置
                                    let data = me._computeMovePosition(_moveY, blockElement)
                                    temp = temp.eq(data.index)
                                    temp[data.fx](cloneDragNode)
                                } else {
                                    temp.before(cloneDragNode)
                                }
                            }

                            // 如果拖动的是目标盒子 子元素
                            if (dragCurrNode.attr('data-nowbox') === 'to') {
                                dragCurrNode.remove()
                            }

                            // 拖拽完成回调
                            me._setCurrent(cloneDragNode)

                            // 样式
                            cloneDragNode.removeClass("draging").addClass("dragged").css({'left': '0', 'top': '0', 'visibility': "visible"})
                        }

                        // 隐藏目标线
                        me.body.find(".target-line").remove()
                    }
                }
            }
        })
    }
}

