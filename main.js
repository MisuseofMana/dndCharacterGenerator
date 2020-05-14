'use strict'

let classes = [];
let currentClass = [];

class NewCharacter {
    constructor(name, charClass, charRace, appearance, hitdie, prof, saveThrows, equipment){
        this.name = name;
        this.charClass = charClass;
        this.charRace = charRace;
        this.appearance = appearance;
        this.hitdie = hitdie;
        this.prof = prof;
        this.saveThrows = saveThrows;
        this.equipment = equipment;
    }
}

const getClasses = () => {
    fetch('https://www.dnd5eapi.co/api/classes')
    .then(res => res.json())
    .then(gotten => classes = gotten)
} 

const getRandomName = () => {
    fetch('http://names.drycodes.com/10?nameOptions=boy_names&&na')
    .then(res => res.json())
    .then(gotten => classes = gotten)
} 

const makeCharacter = (whosClicked) => {
    console.log(whosClicked);
}

window.onload = getClasses();