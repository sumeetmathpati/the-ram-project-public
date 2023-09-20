---
---

var map = L.map('map', { attributionControl: false }).setView([0, 0], 2);
const offcanvas = new bootstrap.Offcanvas('#myOffcanvas')

locations = {
    ayodhya: {
        name: "Ayodhya",
        info: "Birthplace of Shriram, capital of Kosala kingdom."
    },
    prayag: {
        name: "Prayag",
        info: "Shriram visited Rishi Bharadwaj's ashram."
    },
    chitrakut: {
        name: "Chitrakut",
        info: "Shriram built parna-shala to live here while in vanavas. Place of Bharat milap. "
    },
    satna: {
        name: "Satna",
        info: ""
    },
    nagpur: {
        name: "Nagpur",
        info: ""
    },
    panchavati: {
        name: "Panchavati",
        info: "Shriram, Lakshman, and Sita lived here for long time. Lakshman chopped Shurpanakha's nose. Here, Ravan abducted Sita and carried her in Pushpak viman. Jatayu who tried to rescue Sita, slayed by Ravan."
    },
    agastya_ashram: {
        name: "Agastya Ashram",
        info: ""
    },
    dandakaranya: {
        name: "Dandakaranya",
        info: "Shriram killed many deamons here with the devine bow and arrows presented by Rishi Agastya."
    },
    kishkindha: {
        name: "Kishkindha",
        info: "Sriram and Sita Mata visited Rishi Matang's ashram to meet Mata Shabari. Shriram meet Hanuman here, and helped Sugreev to befeat Bali and made him the former king of Kishkindha. Later he united vanar sena."
    },
    rameshwaram: {
        name: "Rameshwaram",
        info: "From here, vanar sena constructed the Ram Setu under the supervision of Nal and Neal"
    },
    suvela: {
        name: "Suvela",
        info: "Sriram assembled hir army for the battle "
    },
    ashik_vatika: {
        name: "Ashok Vatika",
        info: "Mata Sita was kept captive here by Ravan. Hanuman discovered Mata Sita here."
    },
    lankapuri: {
        name: "Lankapuri",
        info: "This is Ravan's Kingdom. Vibhishan was coronated as king of Lanka"
    }
}
var points = [
    { latlong: [50.28933925329178, -3.5156250000000004], name: 'ayodhya', title: 'Ayodhya' },
    { latlong: [40.3130432088809, -6.50390625], name: 'prayag' },
    { latlong: [38.41055825094609, -17.226562500000004], name: 'chitrakut', title: 'Chitrakut' },
    { latlong: [35.603718740697314, 17.226562500000004], name: 'satna', title: 'Satna' },
    { latlong: [9.275622176792112, -29.882812500000004], name: 'nagpur', title: 'Nagpur' },
    { latlong: [-5.266007882805498, -85.60546875000001], name: 'panchavati', title: 'Panchavati' },
    { latlong: [-13.581920900545844, -87.27539062500001], name: 'agastya_ashram', title: 'Agastya Ashram' },
    { latlong: [-32.10118973232094, -64.77539062500001], name: 'dandakaranya', title: 'Dandakaranya' },
    { latlong: [-44.5278427984555, -56.68945312500001], name: 'kishkindha', title: 'Kishkindha' },
    { latlong: [-74.93656682526164, -34.10156250000001], name: 'rameshwaram', title: 'Rameshwaram' },
    { latlong: [-77.78619050110467, -19.16015625], name: 'suvela', title: 'Suvela' },
];

// Add layers
layers = ["main", "forest", "forest_labels", "mountain", "mountain_labels", "river", "river_labels"]
layers.forEach(element => {
    L.tileLayer('{{site.baseurl}}/assets/images/tiles/' + element + '/{z}/{x}/{y}.png', {
        maxZoom: 5,
        noWrap: true,
    }).addTo(map);
});

// Create icon
var actualIconSize = [48, 48];
var iconResizeFactor = 0.75
var iconsizeToUse = [actualIconSize[0] * iconResizeFactor, actualIconSize[1] * iconResizeFactor]
var flagIcon = L.icon({
    iconUrl: '{{site.baseurl}}/assets/images/marker-flag.png',
    iconSize: iconsizeToUse, // size of the icon
    iconAnchor: [27 * iconResizeFactor, 48 * iconResizeFactor], // point of the icon which will correspond to marker's location
});


// Add icons to the points
var marketPopup = L.popup();
points.forEach(p => {
    marker = L.marker([p.latlong[0], p.latlong[1]], { icon: flagIcon, title: locations[p.name].name });
    marker.on('click', function (e) {
        marketPopup
            .setLatLng(e.latlng)
            .setContent('<location-popup><location-popup-title>'
                + locations[p.name].name
                + '</location-popup-title></br>'
                + locations[p.name].info
                + '</location-popup>'
            )
            .openOn(map);
        // offcanvas.toggle();
    });

    map.addLayer(marker);
});



// Popup for latLang.
function onMapClick(e) {
    console.log(e.latlng);
}
map.on('click', onMapClick);

// Add path for all points.
var latlngs = [];
points.forEach(e => {
    latlngs.push(e.latlong);
});
var polyline = L.polyline(latlngs, { color: '#ff9a2e', weight: 8, lineCap: 'round' }).addTo(map);