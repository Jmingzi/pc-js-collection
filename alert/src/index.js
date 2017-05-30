import $ from '../../node_modules/jquery'
import './modal.scss'

const defaultSetting = {
    isModal: false,

    hasTop: true,
    title: '提示',
    titleAlign: 'left',
    hasClose: true,
    closeCallback() {},

    msg: 'hello world',

    hasBottom: true,
    confirmBtn: {
        hasBtn: true,
        bgColor: '#29BD8B',
        bdColor: '#29BD8B',
        color: '#fff',
        text: '确定',
        callback() {}
    },
    cancelBtn: {
        hasBtn: true,
        bgColor: '#fff',
        bdColor: '#ccc',
        color: '#333',
        text: '取消',
        callback() {}
    },
    otherBtn: [],
    btnSequence: ['cancelBtn', 'confirmBtn', 'otherBtn']
}

const defaultModalSetting = {
    selector: '',
    width: 500,
    height: 300,
    
    customTop: false,
    customFoot: false,
    
    beforeShow() {
        console.log('before show')
    },
    afterShow() {
        console.log('after show')
    }
}

/**
 * alert,confirm,modal,custom
 * 基础实现
 */
class Base {
    constructor(params) {
        this.params = $.extend(true, {}, defaultSetting, params)
        this.suffix = 'm-'
        this.wrap = null
        this.root = this.createMask()

        this.newInstance()
    }

    newInstance() {
        this.wrap = this.createWrap()

        let head = this.createHead()
        this.wrap.append(head)

        if (!this.params.isModal) {
            let body = this.createBody()
            this.wrap.append(body)
        }

        let foot = this.createFoot()
        this.wrap.append(foot)

        this.root.append(this.wrap)

        if (!this.params.isModal) {
            $('body').append(this.root)
        }
    }

    createMask() {
        return $('<div/>', { class: this._getCls('mask') })
    }

    createWrap() {
        return $('<div/>', { class: this._getCls('wrap') })
    }

    createHead() {
        const m = this.params

        if (m.hasTop) {
            let head = $('<div/>', { class: this._getCls('head') })
            head.append(
                $('<p/>', { class: this._getCls('title'), style: 'text-align:' + m.titleAlign }).text(m.title)
            )

            if (m.hasClose) {
                head.append(
                    $('<div/>', { class: this._getCls('close') }).html('&times')
                )
                
                // bind event
                if (m.closeCallback) {
                    this.root.on('click', this._getDotCls('close'), (e)=> {
                        e.stopPropagation()
                        m.closeCallback()
                        
                        this._destroy()
                    })
                }
            }
            return head
        } else {
            return null
        }
    }

    createBody() {
        let body = $('<div/>', { class: this._getCls('body') })
        body.append(
            $('<p/>', { class: this._getCls('msg') }).html(this.params.msg)
        )
        return body
    }

    createFoot() {
        const m = this.params

        if (m.hasBottom) {
            let foot = $('<div/>', { class: this._getCls('foot') })

            m.btnSequence.forEach(item=> {
                if (m[item].hasBtn) {

                    foot.append(this._renderBtn(m[item]))
                    
                } else if(m[item] instanceof Array && m[item].length > 0) {
                    
                    m[item].forEach(btn=> foot.append(this._renderBtn(btn)))
                }
            })
            
            return foot
        } else {
            return null
        }
    }

    _renderBtn(data) {
        let a = $('<a/>', {
            class: this._getCls('btn'),
            href: 'javascript:',
            style: 'background-color:' + data.bgColor + ';' + 'border-color:' + data.bdColor + ';' + 'color:' + data.color
        }).text(data.text)

        // 绑定事件
        a.on('click', ()=> {
            data.callback && data.callback()
            this._destroy()
        })

        return a
    }

    _destroy() {
        this.root.find(this._getDotCls('close')).off()
        this.root.find(this._getDotCls('btn')).off()
        this.root.remove()
    }

    _getCls(cls) {
        return this.suffix + cls
    }

    _getDotCls(cls) {
        return '.' + this.suffix + cls
    }
}

class Modal extends Base {
    constructor(modalParams, alertParams) {
        super(alertParams)
        
        if (!modalParams.selector) {
            throw Error('selector is must')
        }
        
        this.modalParams = $.extend({}, defaultModalSetting, modalParams)
        this.modalHtml = $(modalParams.selector).html()
        $(modalParams.selector).remove()

        this.init()
    }

    init() {
        const { width, height, selector } = this.modalParams

        this.wrap.css({
            width: width,
            height: height,
            marginTop: - height / 2,
            marginLeft: - width / 2
        })
        
        let body = $('<div/>', { class: 'modal-body' }).html(this.modalHtml)
        this.wrap.find(this._getDotCls('head')).after(body)

        // mask add selector
        if (/\./.test(selector)) {
            this.root.attr('class', selector.substring(1))
        } else if (/#/.test(selector)) {
            this.root.attr('id', selector.substring(1))
        } else {
            this.root.attr('id', selector)
        }
    }

    show() {
        this.modalParams.beforeShow()
        $('body').append(this.root)
        this.modalParams.afterShow()
    }
}

const customModal = {
    alert(msg, confirmCallback) {
        let data = {
            msg: msg,
            confirmBtn: {
                confirmCallback: confirmCallback
            },
            cancelBtn: {
                hasBtn: false
            }
        }
        new Base(data)
    },
    confirm(msg, okText, ok, cancelText, cancel) {
        let data = {
            msg: msg,
            confirmBtn: {
                text: okText || '确定',
                callback: ok,
            },
            cancelBtn: {
                text: cancelText || '取消',
                callback: cancel
            }
        }
        new Base(data)
    },
    custom(data) {
        new Base(data)
    },

    _modal: [],

    modal(modalParams, alertParams) {
        let instance = this._modal[modalParams.selector]

        if (!instance) {
            alertParams = $.extend({}, {
                isModal: true,
                hasBottom: false
            }, alertParams)

            instance = new Modal(modalParams, alertParams)
            this._modal[modalParams.selector] = instance
        }

        return instance
    }
}

if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = customModal
} else {
    window.modal = customModal
}

