import './loadingShell.scss'

const htmlTpl = `<div class="loading-cell">
    <p class="list list-80 bg-gray animated"></p>
    <p class="list list-40 bg-gray animated duration-double"></p>
</div>`

class LoadingShell {
    constructor(params) {
        if (params.cellNum <= 0) {
            params.cellNum = 3
        }
        if (!params.htmlTpl) {
            params.htmlTpl = htmlTpl
        }

        this.params = params
        this.body = document.getElementsByTagName('body')[0]
        this.shell = document.getElementById('loading-shell')

        this.init()
    }

    init() {
        if (!this.shell && this.body) {
            this.body.appendChild(this.createShell())
            this.shell = document.getElementById('loading-shell')
        }
    }

    createShell() {
        let div = document.createElement('div'),
            html = ''

        for (let i = 0; i < this.params.cellNum; i++) {
            html += htmlTpl
        }
        div.innerHTML = html
        div.id = 'loading-shell'

        return div
    }

    show() {
        this.shell.style.display = 'block'
        setTimeout(()=> {
            this.shell.style.opacity = 1
        }, 0)
    }

    hide() {
        this.shell.style.opacity = 0
        setTimeout(()=> {
            this.shell.remove()
        }, 300)
    }
}

export default LoadingShell

