/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__toast_scss__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__toast_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__toast_scss__);
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

            var msg = document.createElement('span');
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


/* harmony default export */ __webpack_exports__["a"] = ({
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
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__toast__ = __webpack_require__(0);


__WEBPACK_IMPORTED_MODULE_0__toast__["a" /* default */].error('11');

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);