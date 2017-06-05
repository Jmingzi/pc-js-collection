import LoadingShell from './loadingShell.js'

const shell = new LoadingShell({
    cellNum: 3,
    htmlTpl: ''
})

shell.show()

setTimeout(()=> {
    shell.hide()
}, 3000)