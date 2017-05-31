import './index.scss'

class Toast {
    static setting = {
        type: 'default',
        msg: 'toast',
        duration: 3000
    }

    constructor(opt) {
        this.setting = Object.assign({}, Toast.setting, opt)
        this.init()
    }

    init() {
        this.removeDiv(this.createDiv())
    }

    createDiv() {
        let topWrap = document.createElement('div')
        topWrap.setAttribute('class', this.getClassName(''))

        let div = document.createElement('div')
        div.setAttribute('class', 'm-toast')

        let msg = document.createElement('span')
        msg.innerText = this.setting.msg
        div.appendChild(msg)
        topWrap.appendChild(div)
        document.body.appendChild(topWrap)

        setTimeout(()=> {
            topWrap.setAttribute('class', this.getClassName('enter-active'))
        }, 10)

        return topWrap
    }

    removeDiv(div) {
        setTimeout(()=> {
            div.setAttribute('class', this.getClassName('leave-active'))
            setTimeout(()=> div.remove(), 500)
        }, this.setting.duration)
    }

    getClassName(type) {
        return 'div-wrap ' + type + ' ' + this.setting.type
    }
}

const exportToast = {
    error(str, duration) {
        return new Toast({
            type: 'error',
            msg: str,
            duration: duration || 3000
        })
    },
    info(str, duration) {
        return new Toast({
            type: 'info',
            msg: str,
            duration: duration || 3000
        })
    },
    default(str, duration) {
        return new Toast({
            type: 'default',
            msg: str,
            duration: duration || 3000
        })
    },
    success(str, duration) {
        return new Toast({
            type: 'success',
            msg: str,
            duration: duration || 3000
        })
    }
}

if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = exportToast
} else {
    window.toast = exportToast
}