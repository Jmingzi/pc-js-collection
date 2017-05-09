import $ from 'jquery'
import './modal.scss'

const defaultSetting = {
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

class Base {
    constructor(params) {
        this.params = $.extend(true, {}, defaultSetting, params)
        console.log(this.params)
        this.suffix = 'm-'
        this.root = $('<div/>', { class: this.getCls('mask') })
        this.newInstance()
    }

    newInstance() {
        // console.log(this.params)
        let wrap = this.createWrap()
        let head = this.createHead()
        let body = this.createBody()
        let foot = this.createFoot()

        wrap.append(head).append(body).append(foot)
        this.root.append(wrap)
        $('body').append(this.root)
    }

    createWrap() {
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
        return $('<div/>', { class: this.getCls('wrap') })
    }

    createHead() {
        const m = this.params
        if (m.hasTop) {
            let head = $('<div/>', { class: this.getCls('head') })
            head.append(
                $('<p/>', { class: this.getCls('title'), style: 'text-align:' + m.titleAlign }).text(m.title)
            )
            if (m.hasClose) {
                head.append(
                    $('<div/>', { class: this.getCls('close') }).html('&times')
                )
                // bind event
                if (m.closeCallback) {
                    // this.root.on('click', this.getDotCls('close'), this.close.bind(this, this.params))
                    this.root.on('click', this.getDotCls('close'), (e)=> {
                        e.stopPropagation()
                        m.closeCallback()
                        this.destory()
                    })
                }
            }
            return head
        } else return null
    }

    createBody() {
        let body = $('<div/>', { class: this.getCls('body') })

        body.append(
            $('<p/>', { class: this.getCls('msg') }).html(this.params.msg)
        )
        return body
    }

    createFoot() {
        const m = this.params
        if (m.hasBottom) {
            let foot = $('<div/>', { class: this.getCls('foot') })
            const renderBtn = (data)=> {
                let a = $('<a/>', {
                    class: this.getCls('btn'),
                    href: 'javascript:',
                    style: 'background-color:' + data.bgColor + ';' + 'border-color:' + data.bdColor + ';' + 'color:' + data.color
                }).text(data.text)

                // 绑定事件
                a.on('click', ()=> {
                    data.callback && data.callback()
                    this.destory()
                })

                foot.append(a)
            }

            m.btnSequence.map(item=> {
                if (m[item].hasBtn) {
                    renderBtn(m[item])
                } else if(m[item] instanceof Array && m[item].length > 0) {
                    m[item].map(btn=> {
                        renderBtn(btn)
                    })
                }
            })
            return foot
        } else return null
    }

    destory() {
        this.root.find(this.getDotCls('close')).off()
        this.root.find(this.getDotCls('btn')).off()
        this.root.remove()
    }

    getCls(cls) {
        return this.suffix + cls
    }

    getDotCls(cls) {
        return '.' + this.suffix + cls
    }
}

export default {
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
    }
}

