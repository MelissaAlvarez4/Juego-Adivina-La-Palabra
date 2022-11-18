function changeSelect(actualSlots){
    const slots = [...actualSlots]
    const emptySlot = slots.find(slotSelected => slotSelected.textContent === '')
    if(emptySlot) emptySlot.classList.add('selected')
}

function insertLetter(event) {
    console.log(event.target.parentNode)
    const atualContainer = event.target.parentNode
    const slotSelected = atualContainer.querySelector('.selected')

    if(slotSelected){
        slotSelected.textContent = event.target.getAttribute('data-key')
        slotSelected.classList.remove('selected')
        changeSelect(atualContainer.childNodes)
    }
}

function removeLetter(event){
    const atualContainer = event.target.parentNode
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

export {
    insertLetter,
    removeLetter
}