class Loading {
    constructor() {
        this.img = document.createElement('img')
        this.mask = document.createElement('div')
        this.p = document.createElement('p')
        
        this.animateTimelong = '0.3'
        
        this.init()
    }
    
    init() {
        Element.prototype.addStyle = function (styles) {
            for (let property in styles) {
                this.style[property] = styles[property]
            }
        }
        
        this.createDom ()
    }
    
    createDom() {
        let width = 34
    
        this.img.src = require('./loading.gif')
        this.img.addStyle({
            'position': 'fixed', 'top': '40%', 'left': '50%',
            'margin-left': width/-2 + 'px',
            'margin-top': width/-2 + 'px',
            'width': width + 'px',
            'height': width + 'px'
        })
    
        this.p.addStyle({
            'position': 'fixed', 'top': '40%', 'left': '0',
            'width': '100%',
            'line-height': '20px',
            'text-align': 'center',
            'margin-top': '25px',
            'color': '#2acbfb'
        })
        this.p.innerText = '加载中...'
    
        this.mask.addStyle({
            'display': 'none',
            'opacity': '0',
            'position': 'fixed', 'top': '0', 'bottom': '0', 'left': '0', 'right': '0',
            'background-color': 'rgba(255,255,255,.7)',
            'z-index': '11',
            'transition': 'opacity '+ this.animateTimelong +'s linear',
            '-webkit-transition': 'opacity '+ this.animateTimelong +'s linear'
        })
    
        this.mask.appendChild(this.p)
        this.mask.appendChild(this.img)
        
        document.body.appendChild(this.mask)
    }
    
    show() {
        this.overBody(true)
        this.mask.style.display = 'block'
        
        setTimeout(()=> {
            this.mask.style.opacity = 1
        }, 0)
    }
    
    hide() {
        this.overBody(false)
        this.mask.style.opacity = 0
        
        setTimeout(()=> {
            this.mask.style.display = 'none'
        }, this.animateTimelong * 1000)
    }
    
    eventDefault(e) {
        e.preventDefault()
        e.stopPropagation()
    }
    
    overBody(type) {
        if (/Mobile/.test(navigator.appVersion)) {
            type ? document.addEventListener('touchmove', this.eventDefault) :
                    document.removeEventListener('touchmove', this.eventDefault)
        } else {
            document.documentElement.style.overflow = type ? 'hidden' : ''
        }
    }
}

export default new Loading()
