let url = 'https://api.wheretheiss.at/v1/satellites/25544';

let issLat = document.querySelector('#iss-lat');
let issLong = document.querySelector('#iss-long');
let lastUpdated = document.querySelector('#last-updated');
let update = 10000; // 10 seconds
let issMarker; // leaflet marker
let map = L.map('iss-map').setView([0, 0], 1); // center at 0,0 and max zoom

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Custom ISS icon
let customIcon = L.icon({
    iconUrl: 'noun-iss-956251.svg', // Replace with the actual path to your ISS icon
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
});

iss(); // initial call function
setInterval(iss, update); // call iss function update every second

function iss() {
    fetch(url)
        .then(res => res.json())
        .then((issData) => {
            console.log(issData);
            let lat = issData.latitude;
            let long = issData.longitude;
            let timestamp = new Date(issData.timestamp * 1000); // Convert UNIX timestamp to milliseconds
            issLat.innerHTML = lat;
            issLong.innerHTML = long;

            // create marker if does not exist
            // move marker if it does exist
            if (!issMarker) {
                issMarker = L.marker([lat, long], { icon: customIcon }).addTo(map); // Create the marker
            } else {
                issMarker.setLatLng([lat, long]); // Already exists — move to a new location
            }

            // Update timestamp
            lastUpdated.innerHTML = 'Last Updated: ' + timestamp.toLocaleString();
        })
        .catch(function (err) {
            console.error('ERROR!', err.message);
        });
}
