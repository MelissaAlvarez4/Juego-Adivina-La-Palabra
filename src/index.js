import './styles.css'
import words from './dictionary.js'
import addContainerSlots from './containerSlots.js'

window.onload = ()=> {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const slotsMainContainer = document.querySelector('#words')
    const letterKeys = document.querySelectorAll('.key')
    const deleteKey = document.querySelector('#backspace')
    const enterKey = document.querySelector('#enter')


    function slotContent(slots) {
        const arraySlots = [...slots]
        return arraySlots.find(slotSelected => slotSelected.textContent === '')
    }

    function changeSelect(actualSlots) {
        const emptySlot = slotContent(actualSlots)
        if(emptySlot) emptySlot.classList.add('selected')
    }

    function insertLetter(event) {
        const atualContainer = slotsMainContainer.lastChild
        const slotSelected = atualContainer.querySelector('.selected')

        if(slotSelected){
            slotSelected.textContent = event.target.getAttribute('data-key')
            slotSelected.classList.remove('selected')
            changeSelect(atualContainer.childNodes)
        }
    }

    function removeLetter() {
        const atualContainer = slotsMainContainer.lastChild
        const slotSelected = atualContainer.querySelector('.selected')

        if(slotSelected) {
            if(slotSelected.textContent !== '') {
                slotSelected.textContent = ''
            } else if(atualContainer.firstChild !== slotSelected) {
                slotSelected.previousSibling.textContent = ''
            }
            slotSelected.classList.remove('selected')
        } else {
            atualContainer.lastChild.textContent = ''
        }
        changeSelect(atualContainer.childNodes)
    }

    function findWord(slots) {
        let newWord = [...slots].map(slot => slot.textContent.toLowerCase())
        newWord = newWord.join('')
        return words.find(word => word === newWord)
    }

    function check() {
        const slots = slotsMainContainer.lastChild.childNodes
        
        if(slotContent(slots)) {
            alert('No hay suficientes letras')
        } else if(findWord(slots)) {
            console.log('siiiiuuu')
        }
    }

    function listenerKeyboard() {
        letterKeys.forEach(key => key.onclick = insertLetter)
        deleteKey.onclick = removeLetter
        enterKey.onclick = check
    }

    addContainerSlots(slotsMainContainer)
    listenerKeyboard()
    console.log(randomWord)

}