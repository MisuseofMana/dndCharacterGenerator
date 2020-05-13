'use strict'

let classes = [];
let currentClass = [];

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

window.onload = getClasses();