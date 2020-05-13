'use strict'

let classes = [];
let currentClass = [];

const getClasses = (path) => {
    fetch('https://www.dnd5eapi.co/api/classes')
    .then(res => res.json())
    .then(gotten => classes = gotten)
} 

window.onload = getClasses();