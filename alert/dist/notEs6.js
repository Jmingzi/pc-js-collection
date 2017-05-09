'use strict';

// Object.defineProperty(exports, "__esModule", {
//     value: true
// });

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import $ from 'jquery'
// import './modal.scss'

var defaultSetting = {
    hasTop: true,
    title: '提示',
    titleAlign: 'left',
    hasClose: true,
    closeCallback: function closeCallback() {},


    msg: 'hello world',

    hasBottom: true,
    confirmBtn: {
        hasBtn: true,
        bgColor: '#29BD8B',
        bdColor: '#29BD8B',
        color: '#fff',
        text: '确定',
        callback: function callback() {}
    },
    cancelBtn: {
        hasBtn: true,
        bgColor: '#fff',
        bdColor: '#ccc',
        color: '#333',
        text: '取消',
        callback: function callback() {}
    },
    otherBtn: [],
    btnSequence: ['cancelBtn', 'confirmBtn', 'otherBtn']
};

var Base = function () {
    function Base(params) {
        _classCallCheck(this, Base);

        this.params = $.extend(true, {}, defaultSetting, params);
        console.log(this.params);
        this.suffix = 'm-';
        this.root = $('<div/>', { class: this.getCls('mask') });
        this.newInstance();
    }

    _createClass(Base, [{
        key: 'newInstance',
        value: function newInstance() {
            // console.log(this.params)
            var wrap = this.createWrap();
            var head = this.createHead();
            var body = this.createBody();
            var foot = this.createFoot();

            wrap.append(head).append(body).append(foot);
            this.root.append(wrap);
            $('body').append(this.root);
        }
    }, {
        key: 'createWrap',
        value: function createWrap() {
            // // 绑定事件
            // this.root.on({
            //     mousedown: e=> e.stopPropagation(),
            //     mouseup: e=> e.stopPropagation(),
            //     click: e=> e.stopPropagation()
            // })
            // const { header } = this.params
            // if (header.hasClose) {
            //     this.root.on('click', this.getDotCls('close'), this.close.bind(this))
            // }
            return $('<div/>', { class: this.getCls('wrap') });
        }
    }, {
        key: 'createHead',
        value: function createHead() {
            var _this = this;

            var m = this.params;
            if (m.hasTop) {
                var head = $('<div/>', { class: this.getCls('head') });
                head.append($('<p/>', { class: this.getCls('title'), style: 'text-align:' + m.titleAlign }).text(m.title));
                if (m.hasClose) {
                    head.append($('<div/>', { class: this.getCls('close') }).html('&times'));
                    // bind event
                    if (m.closeCallback) {
                        // this.root.on('click', this.getDotCls('close'), this.close.bind(this, this.params))
                        this.root.on('click', this.getDotCls('close'), function (e) {
                            e.stopPropagation();
                            m.closeCallback();
                            _this.destory();
                        });
                    }
                }
                return head;
            } else return null;
        }
    }, {
        key: 'createBody',
        value: function createBody() {
            var body = $('<div/>', { class: this.getCls('body') });

            body.append($('<p/>', { class: this.getCls('msg') }).html(this.params.msg));
            return body;
        }
    }, {
        key: 'createFoot',
        value: function createFoot() {
            var _this2 = this;

            var m = this.params;
            if (m.hasBottom) {
                var foot = $('<div/>', { class: this.getCls('foot') });
                var renderBtn = function renderBtn(data) {
                    var a = $('<a/>', {
                        class: _this2.getCls('btn'),
                        href: 'javascript:',
                        style: 'background-color:' + data.bgColor + ';' + 'border-color:' + data.bdColor + ';' + 'color:' + data.color
                    }).text(data.text);

                    // 绑定事件
                    a.on('click', function () {
                        data.callback && data.callback();
                        _this2.destory();
                    });

                    foot.append(a);
                };

                m.btnSequence.map(function (item) {
                    if (m[item].hasBtn) {
                        renderBtn(m[item]);
                    } else if (m[item] instanceof Array && m[item].length > 0) {
                        m[item].map(function (btn) {
                            renderBtn(btn);
                        });
                    }
                });
                return foot;
            } else return null;
        }
    }, {
        key: 'destory',
        value: function destory() {
            this.root.find(this.getDotCls('close')).off();
            this.root.find(this.getDotCls('btn')).off();
            this.root.remove();
        }
    }, {
        key: 'getCls',
        value: function getCls(cls) {
            return this.suffix + cls;
        }
    }, {
        key: 'getDotCls',
        value: function getDotCls(cls) {
            return '.' + this.suffix + cls;
        }
    }]);

    return Base;
}();

window.modal = {
    alert: function alert(msg, confirmCallback) {
        var data = {
            msg: msg,
            confirmBtn: {
                confirmCallback: confirmCallback
            },
            cancelBtn: {
                hasBtn: false
            }
        };
        new Base(data);
    },
    confirm: function confirm(msg, okText, ok, cancelText, cancel) {
        var data = {
            msg: msg,
            confirmBtn: {
                text: okText || '确定',
                callback: ok
            },
            cancelBtn: {
                text: cancelText || '取消',
                callback: cancel
            }
        };
        new Base(data);
    }
};