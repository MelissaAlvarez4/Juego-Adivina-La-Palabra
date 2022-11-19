import './styles.css'
import addContainerSlots from './containerSlots.js'
import listenerKeyboard from './keyboardActions.js'

window.onload = ()=> {
    addContainerSlots()
    listenerKeyboard()
}