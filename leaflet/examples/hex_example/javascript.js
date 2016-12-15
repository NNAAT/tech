// Setting center and zoom level of the map
var map = L.map('map').setView([56.28453, 10.45761], 14);

// Loading the geoJSON file
var geojson = L.geoJson(hexGrid).addTo(map);


//var wms_map = L.map('wms_map').setView([56.28453, 10.45761], 14);

//var wmsLayer = L.tileLayer.wms('http://demo.opengeo.org/geoserver/ows?', {
//	layers: 'ne:ne'
//}).addTo(wms_map);


// Sliders, user values, x.
var economy_slider = L.control.slider(function(value) {
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
	Logo: 'Economic',
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

var layersValue = []

var hexValue = [];

for (i = 0; i <= hexGrid.features.length; i++) {
/*
	hexLeftArea = hexArea - Area_0;
	
	area_a = area_a1 + area_a2 + area_a3 + area_a4;
	area_b = area_b1 + area_b2 + area_b3 + area_b4;
	area_c = area_c1 + area_c2 + area_c3 + area_c4;
	
	step_1 = 1 - (Area_0 / hexArea);
	step_2 = hexLeftArea / (area_1 + area_a + area_b + area_c);
	areaWeight_1 = 1 * (area_1 / hexLeftArea);
	
	areaWeight_a1 = (economy_value * weightGroup_2 + economy_value * (area_a1 / hexLeftArea)) / 2;
	areaWeight_a2 = areaWeight_a1 + (nature_value * weightGroup_2 + nature_value * (area_a2 / hexLeftArea)) / 2;
	areaWeight_a3 = areaWeight_a2 + (landscape_value * weightGroup_2 + landscape_value * (area_a3 / hexLeftArea)) / 2;
	areaWeight_a4 = areaWeight_a3 + (resource_value * weightGroup_2 + resource_value * (area_a4 / hexLeftArea)) / 2;
	
	areaWeight_b1 = areaWeight_a4 + (economy_value * weightGroup_3 + economy_value * (area_b1 / hexLeftArea)) / 2;
	areaWeight_b2 = areaWeight_b1 + (nature_value * weightGroup_3 + nature_value * (area_b2 / hexLeftArea)) / 2;
	areaWeight_b3 = areaWeight_b2 + (landscape_value * weightGroup_3 + landscape_value * (area_b3 / hexLeftArea)) / 2;
	areaWeight_b4 = areaWeight_b3 + (resource_value * weightGroup_3 + resource_value * (area_b4 / hexLeftArea)) / 2;
	
	areaWeight_c1 = areaWeight_b4 + (economy_value * weightGroup_4 + economy_value * (area_c1 / hexLeftArea)) / 2;
	areaWeight_c2 = areaWeight_c1 + (nature_value * weightGroup_4 + nature_value * (area_c2 / hexLeftArea)) / 2;
	areaWeight_c3 = areaWeight_c2 + (landscape_value * weightGroup_4 + landscape_value * (area_c3 / hexLeftArea)) / 2;
	areaWeight_c4 = areaWeight_c3 + (resource_value * weightGroup_4 + resource_value * (area_c4 / hexLeftArea)) / 2;
	
	// HVORDAN IDENTIFICERER JEG CATEGORY
	// HVORDAN IDENTIFICERER JEG SLIDER
	
	// hexValue.push({ hexid: i, layerid: k, categoryid: 1, value: })
*/
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
        opacity: 0.4,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}


L.geoJson(hexGrid, {style: style}).addTo(map);


// EVENT HANDLER

var prevClickedLayer;

function highlightFeature(e) {
	if(prevClickedLayer){
		geojson.resetStyle(prevClickedLayer);
	}
	
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
	panelUpdate(layer.feature.properties);
		
	console.log(8)
	
	prevClickedLayer = layer;
}


/*
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
*/

function onEachFeature(feature, layer) {
	layer.on({
		click: highlightFeature,
	});
}



// Panel sliding up and down
$(document).on('click', 'span.clickable', function(e){
	console.log(1);
    var $this = $(this);
	if(!$this.hasClass('panel-collapsed')) {
		$this.parents('#info_panel').find('.panel-body').slideUp();
		$this.addClass('panel-collapsed');
		$this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
		console.log(5);
	} 
	else {
		$this.parents('#info_panel').find('.panel-body').slideDown();
		$this.removeClass('panel-collapsed');
		$this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
		console.log(10)
	}
})



geojson = L.geoJson(hexGrid, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

// INFO CONTROL

var jsPanel = document.querySelector('.panel-body');

panelUpdate = function (props) {
    jsPanel.innerHTML = '<h4>Hexagon information</h4>' +  (props ?
        '<b>' + 'Hex no. ' + props.gid + 
		'</b><br />' + (props.beach_protection_ratio * 100).toFixed(2) +  ' %' + 
		'<br />' + 'BLABLA' +
		'<br />' + 'BLABLA' +
		'<br />' + 'BLABLA' +
		'<br />' + 'BLABLA' +
		'<br />' + 'BLABLA' +
		'<br />' + 'BLABLA' +
		'<br />' + 'BLABLA'
        : 'Hover over a hexagon');
};

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

    // loop through our weights and generate a label with a colored square for each interval
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
