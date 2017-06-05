import $ from 'jquery'
let YmDrag = YmDrag || {}

YmDrag.init = function (params) {
    this.body = $("body")
    this.opts = params
    this.bindEvents()

    if (!window.console) {
        window.console = {}
        window.console.log = function () {}
    }
};

/**
 * 组件库
 */
// YmDrag.componentLib = YmDrag.componentLib || { };

/**
 * 是否在 起始或目标div 中
 * @params {type string} 盒子类型
 * @params {pageX number} x值
 * @params {pageY number} y值
 */
YmDrag.isInBox = function (type, pageX, pageY) {
    var box = null, block = [];
    if (type == "block") {
        console.log("区块数量：" + this.opts.dragToBox.find(".block.dragged").length);
        this.opts.dragToBox.find(".block.dragged").each(function () {
            box = $(this);
            if ( pageX >= box.offset().left && pageX < (box.offset().left + box.width()) && pageY >= box.offset().top && pageY < (box.offset().top + box.height()) ) {
                block = box;
                return false;
            } else block = [];
        });
        if (block.length > 0) return block;
        else return false;
    } else {
        if (type == "from") box = this.opts.dragFromBox;
        else if (type == "to") box = this.opts.dragToBox;
        // console.log(box.offset().left);
        // console.log(box.offset().top);
        return !!(pageX >= box.offset().left
        && pageX < (box.offset().left + box.width())
        && pageY >= box.offset().top - 50
        && pageY < (box.offset().top + box.height()));
    }
};

/**
 * 添加目标位置指引
 * @params {pageY number} x值
 * @params {blockElement jQuery Object} 区块对象
 */
YmDrag.addTargetMark = function (pageY, blockElement) {
    var me = this, targetLine = me.body.find(".target-line");

    var data = me.computeMovePosition(pageY, blockElement), temp;
    console.log(data);
    if ( blockElement ) {
        temp = blockElement.find(".ym-drag-item").eq(data.index);
    } else {
        temp = me.opts.dragToBox.children(".ym-drag-item").eq(data.index);
    }
    // console.log(temp);
    //创建line
    if (targetLine.length != 0) { targetLine.remove(); }
    else { targetLine = $('<div></div>').addClass("target-line"); }

    if (data.fx == 'after') {
        temp.after(targetLine);
    } else {
        temp.before(targetLine);
    }
    targetLine.css('display', 'block');
};

/**
 * 计算移动的位置
 * @param pageY
 * @returns {{index: number, fx: string}}
 */
YmDrag.computeMovePosition = function (pageY, blockElement) {
    var me = this, temp;
    var top = 0, itemLen = 0, itemHeightArr = [];
    console.log(blockElement ? ("区块中item数量：" + blockElement.find(".ym-drag-item").length) : ("母盒子item数量：" + me.opts.dragToBox.children(".ym-drag-item").length));
    temp = blockElement ? blockElement.find(".ym-drag-item") : me.opts.dragToBox.children(".ym-drag-item");
    temp.each(function (i) {
        // 得到item的数量
        itemLen = blockElement ? blockElement.find(".ym-drag-item").length : me.opts.dragToBox.children(".ym-drag-item").length;
        // 子元素逐个对比高度
        if (itemLen == 1) {
            // 只有一个子元素时
            top = 0;
        } else {
            // 当含有2个以上的子元素时，
            // 判断当前的pageY与前一个子元素的高度差
            top = pageY - me.opts.dragToBox.offset().top;

            if (i < itemLen-1) {
                // 记录offsetTop + 自身高度的一半
                itemHeightArr.push( $(this).offset().top - me.opts.dragToBox.offset().top + $(this).outerHeight(true) / 2);
            }
        }
    });
    // 判断当前的高度差
    return me.compareTop(top, itemHeightArr);
};

/**
 * 比较高度差与每一个子元素一般高度的大小
 * @param v
 * @param arr
 * @returns {{index: number, fx: string}}
 */
YmDrag.compareTop = function (v, arr) {
    var data = {
        index: 0,
        fx: 'before'
    }, min = 0, fall = [];

    if (arr.length == 0) {}
    else if (arr.length == 1) {
        // arr只有一位数
        (v - arr[0] > 0) ? (data.fx = 'after') : (data.fx = 'before');
    } else {
        $.each(arr, function (i) { fall.push(v - arr[i]); });
        // 先找到最小值
        min = fall[0];
        $.each(fall, function (i) {
            if (Math.abs(fall[i]) < Math.abs(min)) {
                min = fall[i];
            }
        });
        // 找到最小值的下标，以及符号
        $.each(fall, function (i) {
            if (fall[i] == min) {
                data.index = i;
                if (fall[i] > 0) {
                    data.fx = 'after';
                }
                else data.fx = 'before';
            }
        });
    }
    return data;
};

YmDrag.isExist = function (child, parent) {
    var component = child.attr("data-componentname");
    if (0 >= parent.find(".ym-drag-item[data-componentname='" + component + "']").length) {
        return false;
    }
    return true;
};

/**
 * 事件绑定
 */
YmDrag.bindEvents = function () {
    var me = this,

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

    /**
     * 控件盒子 拖拽绑定
     */
    me.opts.dragFromBox.on("click", ".ym-drag-item", function (e) {
        if (e.button != 0) return false; // 只允许左键按下
        e.stopPropagation();
    });
    me.opts.dragFromBox.on("mousedown", ".ym-drag-item", function(e) {
        if (e.button != 0) return false; // 只允许左键按下
        console.log("*************drag start**************");
        _move = true;
        // _isMoved = false;
        dragCurrNode = $(this);
        dragCurrNode.fadeTo(20, 0.5);

        _downX = e.pageX - parseInt( dragCurrNode.offset().left );
        _downY = e.pageY - parseInt( dragCurrNode.offset().top );

        cloneDragNode = dragCurrNode.clone();
        // 加上时间戳，唯一标识name
        cloneDragNode.attr("data-componentname", cloneDragNode.attr('data-componentname') + "-" + (new Date()).getTime());

        return false;
    });

    /**
     * 目标盒子 拖拽绑定
     */
    me.opts.dragToBox.on("click", '.ym-drag-item', function (e) {
        if (e.button != 0) return false; // 只允许左键按下
        e.stopPropagation();
    });
    me.opts.dragToBox.on('mousedown', '.ym-drag-item', function(e){
        if (e.button != 0) return false; // 只允许左键按下
        console.log("*************drag start**************");
        _move = true;
        // _isMoved = false;
        dragCurrNode = $(this);
        dragCurrNode.fadeTo(20, 0.5);

        _downX = e.pageX - parseInt( dragCurrNode.offset().left );
        _downY = e.pageY - parseInt( dragCurrNode.offset().top );

        cloneDragNode = dragCurrNode.clone();

        // console.log(cloneDragNode.html())
        return false;
    });

    /**
     * move监听
     */
    $(document).on("mousemove", function(e){
        if (e.button != 0) return false; // 只允许左键按下
        if ( _move ) {
            console.log("----> move start")

            isMoved = true

            var blockElement = null

            _moveX = e.pageX - _downX;
            _moveY = e.pageY - _downY;

            // 判断移动时处于目标盒子
            if ( me.isInBox("from", _moveX, _moveY) ) {
                cloneDragNode.attr("data-nowBox", "from");
                // 不存在 则添加
                cloneDragNode.appendTo( me.opts.dragFromBox );
                console.log("from");

            } else if ( me.isInBox("to", _moveX, _moveY) ) {
                // 不是区块的item 才进行位置判断
                !cloneDragNode.hasClass("block") && ( blockElement = me.isInBox("block", _moveX, _moveY) );
                // console.log(blockElement);
                if ( blockElement ) {
                    console.log("在区块中");
                    cloneDragNode.appendTo( blockElement.find(".block-container") );
                    // 添加目标线
                    me.addTargetMark(_moveY, blockElement);
                    cloneDragNode.attr("in-block", "block")
                } else {
                    console.log("不在区块中");
                    // 不存在 则添加
                    // ( me.opts.dragToBox.find(".ym-drag-item[data-componentname='"+ cloneDragNode.attr("data-componentname") +"']").length == 0 ) &&
                    cloneDragNode.appendTo(me.opts.dragToBox);
                    // 添加目标线
                    me.addTargetMark(_moveY)
                    cloneDragNode.attr("in-block", "none")
                }

                cloneDragNode.attr("data-nowBox", "to")
                console.log("to");
            } else {
                console.log("既不是from，也不是to，也不是block");
                cloneDragNode.removeAttr("data-nowBox");
            }
            // 位置变化
            cloneDragNode.css({
                'visibility': "visible",
                top: _moveY,
                left: _moveX
            }).removeClass("curr-edit").addClass("draging");

            console.log("----> move end");
        }
        return false;
    });
    $(document).on("mouseup", function(e){
        if (e.button != 0) return false; // 只允许左键按下

        if ( _move ) {
            console.log("----> up start")

            _move = false
            dragCurrNode.fadeTo("fast", 1)
            // console.log(dragCurrNode.html())
            if (!isMoved) {
                console.log('未移动过')
                return false
            }

            isMoved = false

            var temp, blockElement

            _moveX = e.pageX - _downX;
            _moveY = e.pageY - _downY;

            // 判断拖放到那个盒子
            if ( !me.isInBox("to", _moveX, _moveY) ) {
                console.log("不在dragToBox中，被移除");
                cloneDragNode.remove();
            } else {
                // 判断拖放的目标对象
                blockElement = me.isInBox("block", _moveX, _moveY);

                // 样式
                me.opts.dragToBox.find(".ym-drag-item").removeClass('curr-edit');
                cloneDragNode.find(".ym-drag-item").removeClass('curr-edit');
                cloneDragNode.removeClass("draging").addClass("dragged curr-edit");
                cloneDragNode.css({'left': '0', 'top': '0', 'visibility': "visible"});

                if ( blockElement ) {
                    console.log("鼠标在区块中");
                    temp = blockElement.find('.ym-drag-item');

                    if ( cloneDragNode.hasClass("block") ) {
                        // 如果 dragCurrNode == blockElement 是区块本身
                        blockElement.after( cloneDragNode );
                        cloneDragNode.find(".ym-drag-item").removeClass('curr-edit');
                    } else {
                        if (temp.length > 1) {
                            // 计算目标位置
                            var data = me.computeMovePosition(_moveY, blockElement);
                            temp = temp.eq(data.index);
                            if (data.fx == 'after') {
                                temp.after(cloneDragNode);
                            } else {
                                temp.before(cloneDragNode);
                            }
                        } else {
                            temp.before(cloneDragNode);
                        }
                    }

                } else {
                    console.log("鼠标不在区块中");
                    temp = me.opts.dragToBox.children('.ym-drag-item');

                    if (temp.length > 1) {
                        // 计算目标位置
                        var data = me.computeMovePosition(_moveY, blockElement);
                        temp = temp.eq(data.index);
                        if (data.fx == 'after') {
                            temp.after(cloneDragNode);
                        } else {
                            temp.before(cloneDragNode);
                        }
                    } else {
                        temp.before(cloneDragNode);
                    }
                }

                // 如果拖动的是目标盒子 子元素
                if (dragCurrNode.attr('data-nowbox') == 'to') {
                    console.log("移除dragToBox中克隆后的原始对象");
                    dragCurrNode.remove();
                }
                // 拖拽完成回调
                (typeof me.opts.dragCompleteCallback == "function") && me.opts.dragCompleteCallback(cloneDragNode);
            }
            // 隐藏目标线
            me.body.find(".target-line").remove();

            // 检查目标盒子是否为空
            me.opts.dragToBox.find('.ym-drag-item').length == 0
                ? me.opts.dragToBox.addClass('empty') : (me.opts.dragToBox.hasClass('empty') && me.opts.dragToBox.removeClass('empty'));

            console.log("----> up end");
        }

        console.log("*************drag end**************");
        return false;
    });
};

export default YmDrag