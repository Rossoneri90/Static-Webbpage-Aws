

const API_KEY = '466283c7-c370-4230-930d-c6487a7ec33f';
const DEST_ID_GBG = 740098001; 

function getRouteURL (originId, destId, key) {
return `https://api.resrobot.se/v2.1/trip?format=json&originId=${originId}&destId=${destId}&passlist=true&showPassingPoints=true&accessId=${key}`;
}
function getOriginIdURL (city, key) {
return `https://api.resrobot.se/v2.1/location.name?format=json&input=${city}&accessId=${key}`;
}
function findRoute (fromCity) {
let searchURL = getOriginIdURL(fromCity, API_KEY);

axios.get(searchURL).then(response => {
  let data = response.data;
  let originID = data.stopLocationOrCoordLocation[0].StopLocation.extId;

  let routeURL = getRouteURL(originID, DEST_ID_GBG, API_KEY);
  axios.get(routeURL).then(response => { 
  let data = response.data

console.log (data);
let table = document.querySelector('.tabel');
table.innerHTML = "";

    for( let i = 0 < 2; i++;) {
     
    console.log("Nr", data.Trip[i].LegList.Leg[0].name);  
    console.log("Avång", data.Trip[i].Origin.time);
    console.log("Ankomst", data.Trip[i].Destination.time);

    let tabelrow = document.createElement('tr');
    let tdata1 = document.createElement('td');
    let tdata2 = document.createElement('td');
    let tdata3 = document.createElement('td');

tdata1.textContent = data.Trip[i].LegList.Leg[0].name;
tdata2.textContent = data.Trip[i].Origin.time;
tdata3.textContent = data.Trip[i].Destination.time;

tabelrow.append(tdata1, tdata2, tdata3);

table.append(tabelrow);


    }
    })
})
};

let searchField = document.querySelector('#search-field');
let searchBtn = document.querySelector('#search-btn');

searchBtn.addEventListener('click', event => {
findRoute(searchField.value);

});
