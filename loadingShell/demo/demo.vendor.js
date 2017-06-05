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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loadingShell_scss__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loadingShell_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__loadingShell_scss__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var htmlTpl = '<div class="loading-cell">\n    <p class="list list-80 bg-gray animated"></p>\n    <p class="list list-40 bg-gray animated duration-1"></p>\n</div>';

var LoadingShell = function () {
    function LoadingShell(params) {
        _classCallCheck(this, LoadingShell);

        if (params.cellNum <= 0) {
            params.cellNum = 3;
        }
        if (!params.htmlTpl) {
            params.htmlTpl = htmlTpl;
        }

        this.params = params;
        this.body = document.getElementsByTagName('body')[0];
        this.shell = document.getElementById('loading-shell');

        this.init();
    }

    _createClass(LoadingShell, [{
        key: 'init',
        value: function init() {
            if (!this.shell && this.body) {
                this.body.appendChild(this.createShell());
                this.shell = document.getElementById('loading-shell');
            }
        }
    }, {
        key: 'createShell',
        value: function createShell() {
            var div = document.createElement('div'),
                html = '';

            for (var i = 0; i < this.params.cellNum; i++) {
                html += htmlTpl;
            }
            div.innerHTML = html;
            div.id = 'loading-shell';

            return div;
        }
    }, {
        key: 'show',
        value: function show() {
            var _this = this;

            this.shell.style.display = 'block';
            setTimeout(function () {
                _this.shell.style.opacity = 1;
            }, 0);
        }
    }, {
        key: 'hide',
        value: function hide() {
            var _this2 = this;

            this.shell.style.opacity = 0;
            setTimeout(function () {
                _this2.shell.remove();
            }, 300);
        }
    }]);

    return LoadingShell;
}();

/* harmony default export */ __webpack_exports__["a"] = (LoadingShell);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loadingShell_js__ = __webpack_require__(0);


var shell = new __WEBPACK_IMPORTED_MODULE_0__loadingShell_js__["a" /* default */]({
    cellNum: 3,
    htmlTpl: ''
});

shell.show();

setTimeout(function () {
    shell.hide();
}, 3000);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);