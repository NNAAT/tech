var map = L.map('map').setView([56.28453, 10.45761], 14);

/*
mapBoxWMS = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia25hc3RpIiwiYSI6ImNpd2l6MWU4djAwMDMydW1vZTh6Mm1uMXYifQ.DXuWMBcdR94VOKS48x5bAw', {
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	maxZoom: 18,
	minZoom: 0,
}).addTo(map);
*/

function muniStyle(feature) {
    return {
        fillColor: '#1A9641',
        weight: 2,
        opacity: 0.4,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.8
    };
}

 var geoJsonMuni = L.geoJson(muniFrame, {style: muniStyle}).addTo(map);
// var geoJsonHex = L.geoJson(hexGrid, {style: muniStyle}).addTo(map);

L.control.scale().addTo(map);