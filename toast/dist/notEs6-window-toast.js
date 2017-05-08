'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Toast = function () {
    function Toast(opt) {
        _classCallCheck(this, Toast);

        this.setting = Object.assign({}, Toast.setting, opt);
        this.init();
    }

    _createClass(Toast, [{
        key: 'init',
        value: function init() {
            this.removeDiv(this.createDiv());
        }
    }, {
        key: 'createDiv',
        value: function createDiv() {
            var _this = this;

            var topWrap = document.createElement('div');
            topWrap.setAttribute('class', this.getClassName(''));

            var div = document.createElement('div');
            div.setAttribute('class', 'm-toast');

            var msg = document.createElement('p');
            msg.innerText = this.setting.msg;
            div.appendChild(msg);
            topWrap.appendChild(div);
            document.body.appendChild(topWrap);

            setTimeout(function () {
                topWrap.setAttribute('class', _this.getClassName('enter-active'));
            }, 10);

            return topWrap;
        }
    }, {
        key: 'removeDiv',
        value: function removeDiv(div) {
            var _this2 = this;

            setTimeout(function () {
                div.setAttribute('class', _this2.getClassName('leave-active'));
                setTimeout(function () {
                    return div.remove();
                }, 500);
            }, this.setting.duration);
        }
    }, {
        key: 'getClassName',
        value: function getClassName(type) {
            return 'div-wrap ' + type + ' ' + this.setting.type;
        }
    }]);

    return Toast;
}();

Toast.setting = {
    type: 'default',
    msg: 'toast',
    duration: 3000
};

var exportToast = {
    error: function error(str, duration) {
        return new Toast({
            type: 'error',
            msg: str,
            duration: duration || 3000
        });
    },
    info: function info(str, duration) {
        return new Toast({
            type: 'info',
            msg: str,
            duration: duration || 3000
        });
    },
    default: function _default(str, duration) {
        return new Toast({
            type: 'default',
            msg: str,
            duration: duration || 3000
        });
    },
    success: function success(str, duration) {
        return new Toast({
            type: 'success',
            msg: str,
            duration: duration || 3000
        });
    }
};

// http://es6.ruanyifeng.com/#docs/module-loader#ES6-模块与-CommonJS-模块的差异
if (typeof module !== 'undefined' && typeof exports === 'object' && define.cmd) {  
    module.exports = exportToast
} else {  
    window.toast = exportToast
}  
