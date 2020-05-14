'use strict'

let fetchData = [
    {type:'name', gotInfo:undefined}, 
    {type:'baseData', gotInfo:undefined},
    {type:'races', gotInfo:undefined},
    {type:'raceData', gotInfo:undefined}

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
    getData('https://randomuser.me/api/?inc=gender,name', 'name');
}

function makeCharacter(whatToRun) {
    if(whatToRun === 'baseData') {
        let basehandlerIndex = fetchData.findIndex(o => o.type === 'baseData');
        let basehandler = fetchData[basehandlerIndex].gotInfo;
        console.log('Base Handler');
        console.log(basehandler);

        let domClass = document.getElementById('class');
        domClass.innerText = basehandler.name;

        let domApperance = document.getElementById('appearance');
        let domHitDie = document.getElementById('hitdie');
        let domProf = document.getElementById('prof');
        let domSaveThrow = document.getElementById('saveThrow');
        let domEquip = document.getElementById('equipment');
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
        alignSugg.innerText
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
    return Math.floor(Math.random() * max - 1);
}
