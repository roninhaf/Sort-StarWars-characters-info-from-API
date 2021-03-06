"use sctrict";

const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'star_wars_logo_PNG31.png';

const buttonContainer = document.createElement('div');
buttonContainer.setAttribute('class', 'buttonContainer');

//Creating button 1
const sortHeightButton = document.createElement('button');
const textHeight = document.createTextNode('Sort by height');
sortHeightButton.appendChild(textHeight);
sortHeightButton.setAttribute('id', 'height');

//Creating button 2
const sortMassButton = document.createElement('button');
const textMass = document.createTextNode('Sort by mass');
sortMassButton.appendChild(textMass);
sortMassButton.setAttribute('id', 'mass');

//Creating button 3
const sortFilmNumberButton = document.createElement('button');
const textFilm = document.createTextNode('Sort by number of films');
sortFilmNumberButton.appendChild(textFilm);
sortFilmNumberButton.setAttribute('id', 'film');

//Creating button 4
const sortNameButton = document.createElement('button');
const textName = document.createTextNode('Sort by name');
sortNameButton.appendChild(textName);
sortNameButton.setAttribute('id', 'name');

//Adding buttons to buttonContainer
buttonContainer.appendChild(sortHeightButton);
buttonContainer.appendChild(sortMassButton);
buttonContainer.appendChild(sortFilmNumberButton);
buttonContainer.appendChild(sortNameButton);

//container that will hold info retrieved from server
const container = document.createElement('div');
container.setAttribute('class', 'container');

//Adding all to root Id to create html structure
app.appendChild(logo);
app.appendChild(buttonContainer);
app.appendChild(container);

//Will be used for the different sorting algos
var sortVar;

//will be used to store the JSON object
var data = {};

//Go get the infos
fetch('https://swapi.co/api/people/')
  .then(
    function(response) {
      if (response.status !== 200) {
        
        const errorMessage = document.createElement('h1');
        errorMessage.textContent = `Nope ! The force is not with you today :-/ Status Code: `+response.status;
        app.appendChild(errorMessage);
        return;
      }

      response.json().then(function(retreived) {
        data = retreived;
        displayDefaultCards();
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

function displayDefaultCards() {
    
    //default sort algo
    sortVar = data.results.sort((a,b)=>a.name>b.name);
    
    sortVar.forEach(a => {
        
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        
        const h1 = document.createElement('h1');
        h1.textContent = a.name;
        
        const p = document.createElement('p');
        var html = `<ul><li>Height: ${a.height}cm</li><li>Mass: ${a.mass}kgs</li><li>Appears in ${a.films.length} movies</li></ul>`;
        p.innerHTML = html;
        
        //Adding created elements to container so they will show on screen
        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p);
    });
}
    
    //Use new sort algo and then replace infos
function displayTriggerResult() {
    
    var i=0;
    sortVar.forEach(a => {
        container.childNodes[i].childNodes[0].textContent = a.name;
        html = `<ul><li>Height: ${a.height}cm</li><li>Mass: ${a.mass}kgs</li><li>Appears in ${a.films.length} movies</li></ul>`;
        container.childNodes[i].childNodes[1].innerHTML = html;
        i++;
    })
}

//select new sort algo depending on button clicked on
function triggerSort(event) {
    switch (event.target.id) {
        case 'height':
        sortVar = data.results.sort((a,b) => Number(a.height) > Number(b.height) ? 1 : -1);
        break;
        case 'mass':
        sortVar = data.results.sort((a,b) => Number(a.mass) > Number(b.mass) ? 1 : -1);
        break;
        case 'film':
        sortVar = data.results.sort((a,b) => a.films.length > b.films.length ? 1 : -1);
        break;
        case 'name':
        sortVar = data.results.sort((a,b) => a.name > b.name ? 1 : -1);
        break;
        default:
        sortVar = data.results.sort((a,b) => a.name > b.name ? 1 : -1);
    }
    
    displayTriggerResult();

}

buttonContainer.addEventListener('click', triggerSort);