'use strict'

let fetchData = [
    {type:'name', gotInfo:undefined}, 
    {type:'baseData', gotInfo:undefined},
    {type:'races', gotInfo:undefined},
    {type:'raceData', gotInfo:undefined},
    {type:'equip', gotInfo:undefined},

]

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

const getData = (path, context) => {
    fetch(path)
    .then(res => res.json())
    .then(gotten => {
        let select = fetchData.findIndex(o => o.type === context)
        fetchData[select].gotInfo = gotten;        
    })
    .then(function() {
        makeCharacter(context)
    });
} 

function getCharacter(whosClicked) {    
    getData('https://www.dnd5eapi.co/api/classes/' + whosClicked, 'baseData');
    getData('https://www.dnd5eapi.co/api/races/', 'races')
    getData('https://randomuser.me/api/?inc=gender,name&&nat=us,dk,fr,gb,br,no', 'name');
}

function makeCharacter(whatToRun) {
    if(whatToRun === 'baseData') {
        let basehandlerIndex = fetchData.findIndex(o => o.type === 'baseData');
        let basehandler = fetchData[basehandlerIndex].gotInfo;
        console.log('Base Handler');
        console.log(basehandler);

        let domClass = document.getElementById('class');
        domClass.innerText = basehandler.name;

        let domHitDie = document.getElementById('hitdie');
        domHitDie.innerText = `d${basehandler.hit_die}`;

        let domProf = document.getElementById('prof');
        domProf.innerHTML = '';
        for(const item of basehandler.proficiencies) {
            let newItem = document.createElement('p');
            domProf.appendChild(newItem);
            newItem.innerText = item.name;
        }

        let domSaveThrow = document.getElementById('saveThrow');
        domSaveThrow.innerHTML = '';
        for(const item of basehandler.saving_throws) {
            let newItem = document.createElement('p');
            domSaveThrow.appendChild(newItem);
            newItem.innerText = item.name;
        }

        getData('https://www.dnd5eapi.co' + basehandler.starting_equipment.url, 'equip');

    }
    else if(whatToRun === 'races') {
        let racehandlerIndex = fetchData.findIndex(o => o.type === 'races');
        let racehandler = fetchData[racehandlerIndex].gotInfo;
        console.log('Race Handler');
        console.log(racehandler);

        let randomNumber;

        let domRace = document.getElementById('race');
        let raceLength = racehandler.results.length;
        randomNumber = randomNum(raceLength);

        domRace.innerText = racehandler.results[randomNumber].name;
        let thisRace = racehandler.results[randomNumber].name;
        thisRace = thisRace.toLowerCase();

        getData('https://www.dnd5eapi.co/api/races/' + thisRace, 'raceData');


    }
    else if (whatToRun === 'raceData') {
        let raceDatahandlerIndex = fetchData.findIndex(o => o.type === 'raceData');
        let raceDatahandler = fetchData[raceDatahandlerIndex].gotInfo;
        console.log('Race Data Handler');
        console.log(raceDatahandler);

        let alignSugg = document.getElementById('alignment');
        alignSugg.innerText = raceDatahandler.alignment;
    }
    else if (whatToRun === 'equip') {
        let equiphandlerIndex = fetchData.findIndex(o => o.type === 'equip');
        let equiphandler = fetchData[equiphandlerIndex].gotInfo;
        console.log('Race Data Handler');
        console.log(equiphandler);

        let domEquip = document.getElementById('equipment');
        domEquip.innerHTML = '';
        for(const gear of equiphandler.starting_equipment) {
            let newItem = document.createElement('p');
            domEquip.appendChild(newItem);
            newItem.innerText = `${gear.item.name} x${gear.quantity}`;
        }
    }
    else if (whatToRun === 'name') {
        let namehandlerIndex = fetchData.findIndex(o => o.type === 'name');
        let namehandler = fetchData[namehandlerIndex].gotInfo;
        console.log('Name Handler');
        console.log(namehandler);

        let domName = document.getElementById('name');
        domName.innerText = namehandler.results[0].name.first + ' ' + namehandler.results[0].name.last;
    }
}

function randomNum(max){
    return Math.floor(Math.random() * (max - 1) + 1);
}
