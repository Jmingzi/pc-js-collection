import modal from './alertModal'

modal.alert('heheh')

// modal.confirm('warning', 'ok')

var test = modal.modal({
    selector: '#test',
    
    width: 500,
    height: 300,
    beforeShow() {
        console.log('before show')
    },
    afterShow() {
        console.log('after show')
    }
})

// test.show()


