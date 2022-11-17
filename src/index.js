import './styles.css'
import words from './dictionary.js'

window.onload = ()=> {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const slotsMainContainer = document.querySelector('#words')
    const letterKeys = document.querySelectorAll('.key')
    const deleteKey = document.querySelector('#backspace')
    // const enterKey = document.querySelector('#enter')

    function addClass(event) {
        const slot = event.target
        const slotSelected = slot.parentNode.querySelector('.selected')

        if(slotSelected) slotSelected.classList.remove('selected')
        slot.classList.add('selected')
    }

    
    function addContainerSlots(newContainer) {
        const prevContainer = slotsMainContainer.lastChild

        slotsMainContainer.appendChild(newContainer)
        
        newContainer.childNodes.forEach(slot => {
            slot.addEventListener('click', addClass)
        });

        if(prevContainer) {
            prevContainer.childNodes.forEach(slot => {
                slot.removeEventListener('click', addClass)
            });
        }
    }

    function createContainerSlots() {
        const newContainer = document.createElement("div");
        newContainer.className = 'word'

        for(let i=0; i < 5; i++) {
            let newSlot = document.createElement("div");
            newSlot.className = 'slot'
            newContainer.appendChild(newSlot)
        }
        
        return newContainer
    }

    function changeSelect(actualSlots){
        const slots = [...actualSlots]
        const emptySlot = slots.find(slotSelected => slotSelected.textContent === '')
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

    function removeLetter(){
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

    function listenerKeyboard() {
        letterKeys.forEach(key => key.onclick = insertLetter)
        deleteKey.onclick = removeLetter
    }

    addContainerSlots(createContainerSlots())
    listenerKeyboard()
    console.log(randomWord)

}