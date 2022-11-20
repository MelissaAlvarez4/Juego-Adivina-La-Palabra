import words from './dictionary.js'

const randomWord = words[Math.floor(Math.random() * words.length)];
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
    [...word].forEach((letter, index) => {
        
        if(letter === randomWord[index]) {
            [...slots][index].style.backgroundColor = 'green'

        } else if (randomWord.includes(letter)) {
            [...slots][index].style.backgroundColor = 'yellow'

        } else {
            [...slots][index].style.backgroundColor = 'grey'

        }
    })
}


function check(slotsMainContainer, addContainerSlots) {
    return () => {
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
                addContainerSlots(slotsMainContainer)
            }
        }
    }
}


function changeSelect(actualSlots) {
    const emptySlot = slotContent(actualSlots)
    if(emptySlot) emptySlot.classList.add('selected')
}


function removeLetter(slotsMainContainer) {
    return () => {
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
}


function insertLetter(slotsMainContainer) {
    return (event) => {
        const atualContainer = slotsMainContainer.lastChild
        const slotSelected = atualContainer.querySelector('.selected')
    
        if(slotSelected){
            slotSelected.textContent = event.target.getAttribute('data-key')            
            slotSelected.classList.remove('selected')
            changeSelect(atualContainer.childNodes)
    
        }
    }
}


function listenerKeyboard(slotsMainContainer, addContainerSlots) {
    letterKeys.forEach(key => key.onclick = insertLetter(slotsMainContainer))
    deleteKey.onclick = removeLetter(slotsMainContainer)
    enterKey.onclick = check(slotsMainContainer, addContainerSlots)
}


export default listenerKeyboard