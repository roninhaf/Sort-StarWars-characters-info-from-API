"use sctrict";

const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'star_wars_logo_PNG31.png';

const buttonContainer = document.createElement('div');
buttonContainer.setAttribute('class', 'buttonContainer');

const sortHeightButton = document.createElement('button');
var textHeight = document.createTextNode('Sort by height');
sortHeightButton.appendChild(textHeight);
sortHeightButton.setAttribute('id', 'height');

const sortMassButton = document.createElement('button');
var textMass = document.createTextNode('Sort by mass');
sortMassButton.appendChild(textMass);
sortMassButton.setAttribute('id', 'mass');

const sortFilmNumberButton = document.createElement('button');
var textFilm = document.createTextNode('Sort by number of films');
sortFilmNumberButton.appendChild(textFilm);
sortFilmNumberButton.setAttribute('id', 'film');

const sortNameButton = document.createElement('button');
var textName = document.createTextNode('Sort by name');
sortNameButton.appendChild(textName);
sortNameButton.setAttribute('id', 'name');


buttonContainer.appendChild(sortHeightButton);
buttonContainer.appendChild(sortMassButton);
buttonContainer.appendChild(sortFilmNumberButton);
buttonContainer.appendChild(sortNameButton);

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(buttonContainer);
app.appendChild(container);

req=new XMLHttpRequest();
req.open("GET",'https://swapi.co/api/people/',true);
req.send();
req.onload=function(){
    
    var data=JSON.parse(req.responseText);

    if (req.status >= 200 && req.status < 400) {
    
        var sortVar = data.results.sort((a,b)=>a.name>b.name);

        sortVar.forEach(a => {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
            
            const h1 = document.createElement('h1');
            h1.textContent = a.name;
            
            const p = document.createElement('p');
            p.textContent = `${a.height}cm ${a.mass}kgs Appears in ${a.films.length} movies`;
            
            container.appendChild(card);
            card.appendChild(h1);
            card.appendChild(p);
            });
        
        function displayRes() {
            sortVar.forEach(a => {
                const card = document.createElement('div');
                card.setAttribute('class', 'card');
                
                const h1 = document.createElement('h1');
                h1.textContent = a.name;
                
                const p = document.createElement('p');
                p.textContent = `${a.height}cm ${a.mass}kgs Appears in ${a.films.length} movies`;
                
                container.appendChild(card);
                card.appendChild(h1);
                card.appendChild(p);
            })
        }
        
        //displayRes();
        
        function triggerSort(id) {
            
            //console.log(typeof id);
            
            switch (id.target.id) {
                case 'height':
                sortVar = data.results.sort((a,b)=>Number(a.height)>Number(b.height));
                //console.log(sortVar);
                break;
                case 'mass':
                sortVar = data.results.sort((a,b)=>Number(a.mass)>Number(b.mass));
                //console.log(sortVar);
                break;
                case 'film':
                sortVar = data.results.sort((a,b)=>a.films.length>b.films.length);
                //console.log(sortVar);
                break;
                case 'name':
                sortVar = data.results.sort((a,b)=>a.name>b.name);
                //console.log(sortVar);
                break;
                default:
                sortVar = data.results.sort((a,b)=>a.name>b.name);
                }
            //console.log(sortVar);
            displayRes();
        }
        
        buttonContainer.addEventListener('click', triggerSort);
        //console.log(sortVar);
        
    } else {
        const errorMessage = document.createElement('h1');
        errorMessage.textContent = `Nope ! The force is not with you today :-/`;
        app.appendChild(errorMessage);
        }
};
