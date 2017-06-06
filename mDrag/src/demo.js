import $ from 'jquery'
import Mdrag from './mDrag'
import './mDrag.scss'

new Mdrag({
    dragFromBox: $('.mDrag-from'),
    dragToBox: $('.mDrag-to'),
    delShowCondition(dragItem) {
        // console.log(dragItem)
        return true
    },
    beforeDel(dragItem) {
        console.log('beforeDel')
    },
    afterDel(dragItem) {
        console.log('afterDel')
    },
    beforeDrag(dragItem) {
        console.log('beforeDrag')
    },
    afterDrag(dragItem) {
        // console.log(dragObj)
        console.log('afterDrag')
    }
})