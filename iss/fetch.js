let url = 'https://api.wheretheiss.at/v1/satellites/25544';

let issLat = document.querySelector('#iss-lat')
let issLong = document.querySelector('#iss-long')

let update = 10000;
let issMarker //leaflet marker
let map = L.map('iss-map').setView([0, 0], 1) //center at 0,0 and max zoom
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

iss() //intial call funtion
setInterval(iss,update)//call iss funtion update every seconds

function iss() {
    fetch(url)
        .then(res => res.json())
        .then((issData) => {
            console.log(issData);
            let lat = issData.latitude;
            let long = issData.longitude;
            issLat.innerHTML = lat;
            issLong.innerHTML = long;

            // create marker if does not exist
            // move marker if it does exist
            if (!issMarker) {
                // create marker
                issMarker = L.marker([lat, long]).addTo(map);
            } else {
                // move marker
                issMarker.setLatLng([lat, long]);
            }
        })
        .catch((err) => {
            console.log('ERROR!', err);
        });
}

// Initial call and set up interval
iss();
setInterval(iss, update);
