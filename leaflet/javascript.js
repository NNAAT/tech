var mymap = L.map('mapid').setView([51.500, -0.09], 18);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia25hc3RpIiwiYSI6ImNpd2VucHJ0bjAwOXoyeW54MXR1Y3ZhaTgifQ.8kAMBwWX50TDpzcDUBqxyA', {
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	maxZoom: 18,
	minZoom: 0,
	id: 'mapbox.mapbox-streets-v7',
	accessToken: 'pk.eyJ1Ijoia25hc3RpIiwiYSI6ImNpd2VucHJ0bjAwOXoyeW54MXR1Y3ZhaTgifQ.8kAMBwWX50TDpzcDUBqxyA'
}).addTo(mymap);

var slider = L.control.slider(function(value) {
   		slider_value = value;
	}, {
   	max: 10,
   	value: 5,
   	step:1,
   	size: '180px',
   	orientation:'horizontal',
   	id: 'slider',
	collapsed: false,
	position: 'topleft',
	id: "slider_1"
}).addTo(mymap);
	
	
L.control.betterscale({
	position: 'bottomleft',
	maxWidth: 250
}).addTo(mymap);
	
	
var popup = L.popup();
  
function onHexClick(e) {
	popup
		.setLatLng(e.latlng)
		.setContent("You clicked the map at " + e.latlng.toString() + ". The slider value is " + slider_value)
		.openOn(mymap);
}

mymap.on('click', onHexClick);	
		
		
var marker = L.marker([51.5, -0.09]).addTo(mymap);
	
var hexList = [
	{ id: 1 },
	{ id: 2 },
	{ id: 3 }
];
	
var layersList = [
	{ layer: "residential area", id: 1},
	{ layer: "nature area", id: 2}
];
	
var hexLayerArea =[
	[0.15, 0.05],
	[0.75, 0.00],
	[0.45, 0.90],
];
	
var categoryList = [];
	
// Identifying how much affect the different layers have on a hexagon
for (i = 0; i <= hexList.length; i++) {
	
	for (k = 0; k <= layersList.length; k++) {
		
		var categoryArea = hexLayerArea[i,k] * 100
			
		switch(true) {
		case (categoryArea = 0):
			categoryList.push({ hexid: i, layerid: k, categoryid: 1})
			break;
		case (categoryArea > 0 && categoryArea <= 10):
			categoryList.push({ hexid: i, layerid: k, categoryid: 2})
			break;
		case (categoryArea > 10 && categoryArea <= 30):
			categoryList.push({ hexid: i, layerid: k, categoryid: 3})
			break;
		case (categoryArea > 30 && categoryArea <= 70):
			categoryList.push({ hexid: i, layerid: k, categoryid: 4})
			break;
		case (categoryArea > 70):
			categoryList.push({ hexid: i, layerid: k, categoryid: 5})
			break;
		default:
			break
		}	

	}
	
}
	
// Need to calculate chosen Hex based on the user's click and geometry-->
var chosenHex = 2;

slider.getValue;
	
var text = "You have chosen hex number " + chosenHex; 
	
hexNum = "I am hexagon number " + i + slider.getValue;
	
marker.bindPopup(text).openPopup();					