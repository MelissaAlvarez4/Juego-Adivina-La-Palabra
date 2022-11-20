import './styles.css'
import addContainerSlots from './containerSlots.js'
import listenerKeyboard from './keyboardActions.js'

window.onload = ()=> {
    const slotsMainContainer = document.querySelector('#words')

    addContainerSlots(slotsMainContainer)
    listenerKeyboard(slotsMainContainer, addContainerSlots)
}