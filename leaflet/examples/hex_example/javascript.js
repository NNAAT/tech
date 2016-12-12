// Setting center and zoom level of the map
var map = L.map('map').setView([56.28453, 10.45761], 14);

// Loading the geoJSON file
var geojson = L.geoJson(hexGrid).addTo(map);

// Sliders, user values, x.
var slider = L.control.slider(function(value) {
   		economy_value = value;
	}, {
   	max: 10,
   	value: 5,
   	step:1,
   	size: '180px',
   	orientation:'horizontal',
	collapsed: false,
	position: 'topleft',
	title: 'Economy',
	id: "slider_1"
}).addTo(map);

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
	id: "slider_3"
}).addTo(map);

var slider = L.control.slider(function(value) {
   		ressource_value = value;
	}, {
   	max: 10,
   	value: 5,
   	step:1,
   	size: '180px',
   	orientation:'horizontal',
	collapsed: false,
	position: 'topleft',
	title: 'Ressources',
	id: "slider_4"
}).addTo(map);



// STYLING

// Weight categories, w.

// Restricted areas
var weightGroup_1 = 0.00;

// Unreceptive areas
var weightGroup_2 = 0.25;

// Limiting areas
var weightGroup_3 = 0.50;

// Advantageous areas
var weightGroup_4 = 0.75;

// Free areas
var weightGroup_5 = 1.00;

var hexValue = [];

for (i = 0; i <= hexGrid.features.length; i++) {
	
	// 
	
	// hexValue.push({ hexid: i, layerid: k, categoryid: 1, value: })
}

function getColor(value) {
    return value > 0.8 ? '#1A9641':
	       value > 0.6 ? '#A6D96A':
	       value > 0.4 ? '#FFFFBF':
	       value > 0.2 ? '#FDAE61':
	                     '#D7191C';           
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.beach_protection_ratio),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}


L.geoJson(hexGrid, {style: style}).addTo(map);


// EVENT HANDLER

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
	info.update(layer.feature.properties);
}


function resetHighlight(e) {
    geojson.resetStyle(e.target);
	info.update();
}

/*
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
*/

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
       // click: zoomToFeature
    });
}

geojson = L.geoJson(hexGrid, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

// INFO CONTROL

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Hexagon information</h4>' +  (props ?
        '<b>' + 'Hex no. ' + props.gid + '</b><br />' + (props.beach_protection_ratio * 100).toFixed(2) + ' %'
        : 'Hover over a hexagon');
};

info.addTo(map);

// LEGEND

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 0.2, 0.4, 0.8],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

// POP UP


/*
var popup = L.popup();

function onHexClick(e) {
	popup
		.setLatLng(e.latlng)
		.setContent("You clicked the map at " + e.latlng.toString() + ". The slider value is ")
		.openOn(map);
}

map.on('click', onHexClick);
*/
