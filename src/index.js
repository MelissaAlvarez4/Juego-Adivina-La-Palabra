import './styles.css'
import words from './dictionary.js'

window.onload = ()=> {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const slotsMainContainer = document.querySelector('#words')
    console.log(randomWord)

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

    function addClass(event){
        const slot = event.target
        const arraySlots = [...slot.parentNode.childNodes]
        const slotSelected = arraySlots.find(element => element.classList.contains('selected'))

        if(slotSelected) slotSelected.classList.remove('selected')
        slot.classList.add('selected')
    }

    function listenSelection(actualSlots, prevSlots) {

        actualSlots.forEach(slot => {
            slot.addEventListener('click', addClass)
        });

        if(prevSlots) {
            prevSlots.forEach(slot => {
                slot.removeEventListener('click', addClass)
            });
        }

    }

    function addContainerSlots(newContainer) {
        slotsMainContainer.appendChild(newContainer)
        const prevContainer = newContainer.previousSibling
        let prevSlots = null

        if(prevContainer.tagName === 'DIV') {
            prevSlots =  prevContainer.classList.contains('word') ? prevContainer.childNodes : null
        }

        listenSelection(newContainer.childNodes, prevSlots)
    }

    addContainerSlots(createContainerSlots())

}