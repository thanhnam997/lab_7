let url = 'https://api.wheretheiss.at/v1/satellites/25544';

let issLat = document.querySelector('#iss-lat')
let issLong = document.querySelector('#iss-long')
let timeisslocationFetch=document.querySelector('#time')
let update=10000;
let issMarker
let issIcon=L.icon({
    iconUrl:"icon_iss.PNG",
    iconSize:[50,50],
    iconAnchor:[]
})


let map = L.map('iss-map').setView([0, 0], 1); // center at 0,0 and max zoom

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

iss()//call funtion one time to start
setInterval(iss,update) //10 seconds

function iss() {
fetch(url)
. then(res => res.json())
. then(issData => {
    console.log( issData)
    let lat= issData. latitude
let long= issData. longitude
issLat. innerHTML = lat
issLong. innerHTML = long

let issMarker = L.marker( [lat,long]).addTo(map)
//create marker if it does'nt exist
//move marker if it does exist

if(!issMarker){
    issMarker=L.marker([lat,long]).addTo(map)
}else{
    issMarker.setLatLng([lat,long])
}

let now= new Date()
timeisslocationFetch.innerHTML = `this data was fetch at ${now}`


}).catch( err =>{
console. log (err)
})

}


