import words from './dictionary.js'
import addContainerSlots from './containerSlots.js'

const randomWord = words[Math.floor(Math.random() * words.length)];
const slotsMainContainer = document.querySelector('#words')
const letterKeys = document.querySelectorAll('.key')
const deleteKey = document.querySelector('#backspace')
const enterKey = document.querySelector('#enter')


function slotContent(slots) {
    return [...slots].find(slotSelected => slotSelected.textContent === '')
}


function findWord(slots) {
    const newWord = [...slots].map(slot => slot.textContent.toLowerCase()).join('')
    return words.find(word => word === newWord)
}


function setPositionColor(word, slots) {
    [...word].forEach((letter, index, array) => {
        
        if(array[index] === randomWord[index]) {
            [...slots][index].style.backgroundColor = 'green'

        } else if (randomWord.includes(letter)) {
            [...slots][index].style.backgroundColor = 'yellow'

        } else {
            [...slots][index].style.backgroundColor = 'grey'

        }
    })
}


function check() {
    const slots = slotsMainContainer.lastChild.childNodes
    
    if(slotContent(slots)) {
        alert('No hay suficientes letras.')

    } else {
        const word = findWord(slots)

        if(!word) {
            alert('La palabra no está lista.')

        } else if(word === randomWord) {
                alert('Has ganado!')
                slots.forEach(slot => slot.style.backgroundColor = 'green')

        } else {
            setPositionColor(word, slots)
            addContainerSlots()
        }
    }
}


function changeSelect(actualSlots) {
    const emptySlot = slotContent(actualSlots)
    if(emptySlot) emptySlot.classList.add('selected')
}


function removeLetter() {
    const atualContainer = slotsMainContainer.lastChild
    const slotSelected = atualContainer.querySelector('.selected')

    if(slotSelected) {
        if(slotSelected.textContent !== '') {
            slotSelected.textContent = ''

        } else if(atualContainer.firstChild !== slotSelected && slotSelected.previousSibling.textContent !== '') {
            slotSelected.previousSibling.textContent = ''

        }
        slotSelected.classList.remove('selected')

    } else {
        atualContainer.lastChild.textContent = ''
    }

    changeSelect(atualContainer.childNodes)
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


function listenerKeyboard() {
    letterKeys.forEach(key => key.onclick = insertLetter)
    deleteKey.onclick = removeLetter
    enterKey.onclick = check
}


export default listenerKeyboard