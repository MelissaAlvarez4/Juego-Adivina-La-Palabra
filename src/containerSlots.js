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

function addClass(event) {
    const slot = event.target
    const slotSelected = slot.parentNode.querySelector('.selected')

    if(slotSelected) slotSelected.classList.remove('selected')
    slot.classList.add('selected')
}


function addContainerSlots(slotsMainContainer) {
    const newContainer = createContainerSlots() 
    const prevContainer = slotsMainContainer.lastChild

    slotsMainContainer.appendChild(newContainer)
    newContainer.querySelector('.slot').classList.add('selected')
    
    newContainer.childNodes.forEach(slot => {
        slot.addEventListener('click', addClass)
    });

    if(prevContainer) {
        prevContainer.childNodes.forEach(slot => {
            slot.removeEventListener('click', addClass)
        });
    }
}

export default addContainerSlots