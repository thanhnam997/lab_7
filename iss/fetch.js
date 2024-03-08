let url = 'https://api.wheretheiss.at/v1/satellites/25544';

let issLat = document.querySelector('#iss-lat')
let issLong = document.querySelector('#iss-long')
let timeisslocationFetch=document.querySelector('#time')
let update=10000;
let issMarker
let icon = L.icon({
    iconUrl: 'iss.icon.png',
    iconSize: [50, 50],
    iconAnchor: [25, 25]
});

let max_failed_attempts=3
iss(max_failed_attempts);
function iss(attempts){
    if (attempts<=0){
        alert('too many errors,abandonding requests to get ISS position.')
        return
    }
}



let map = L.map('iss-map').setView([0, 0], 1); // center at 0,0 and max zoom

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

iss(max_failed_attempts)//call funtion one time to start
setInterval(iss,update) //10 seconds

function iss(attempts) {
fetch(url)
. then(res => res.json())
. then(issData => {
    console.log( issData)
    let lat= issData. latitude
let long= issData. longitude
issLat. innerHTML = lat
issLong. innerHTML = long

let issMarker = L.marker( [lat,long],{icon:icon}).addTo(map)
//create marker if it does'nt exist
//move marker if it does exist

if(!issMarker){
    issMarker=L.marker([lat,long],{icon:icon}).addTo(map)
}else{
    issMarker.setLatLng([lat,long])
}

let now= new Date()
timeisslocationFetch.innerHTML = `this data was fetch at ${now}`


}).catch( err =>{
    attempts=attempts-1//subtract 1 from number 1 of attempts
console. log (err)
})
.finally( ()=>{
    // finally runs whether the fetch() worked or failed.
    // Call the iss function after a delay of update miliseconds
    // to update the position
   setTimeout ( iss,update,attempts)
})

}


