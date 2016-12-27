var geojson = L.geoJson(hexGrid).addTo(map);

var slider = L.control.slider(function(value) {
   		nature_value = value;
	}, {
   	max: 10,
   	value: 5,
   	step:1,
   	size: '180px',
   	orientation:'horizontal',
	collapsed: false,
	position: 'topleft',
	title: 'Nature',
	Logo: 'N',
	id: "slider_2"
}).addTo(map);

var slider = L.control.slider(function(value) {
   		landscape_value = value;
	}, {
   	max: 10,
   	value: 5,
   	step:1,
   	size: '180px',
   	orientation:'horizontal',
	collapsed: false,
	position: 'topleft',
	title: 'Landscape',
	Logo: 'Landscape',
	id: "slider_3"
}).addTo(map);

var slider = L.control.slider(function(value) {
   		resource_value = value;
	}, {
   	max: 10,
   	value: 5,
   	step:1,
   	size: '180px',
   	orientation:'horizontal',
	collapsed: false,
	position: 'topleft',
	title: 'Ressources',
	Logo: 'Resources',
	id: "slider_4"
}).addTo(map);