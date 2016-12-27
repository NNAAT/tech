// Setting center and zoom level of the map
//var map = L.map('map').setView([56.28453, 10.45761], 14);
//var map = L.map('map').setView([56.28453, 10.45761], 13);
var map = L.map('map').setView([56.28453, 10.45761], 12);

// WMS-service
mapBoxWMS = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia25hc3RpIiwiYSI6ImNpd2l6MWU4djAwMDMydW1vZTh6Mm1uMXYifQ.DXuWMBcdR94VOKS48x5bAw', {
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	maxZoom: 18,
	minZoom: 9,
}).addTo(map);


// Sliders, user values, x.
var economy_value = 5;

var nature_value = 5;

var landscape_value = 5;

var resource_value = 5;

var opacity_value = 0.3;

var styleRun = 0;

var economy_slider = L.control.slider(function(value) {
   		economy_value = value;
		if (styleRun == 1) {
			//map.removeLayer(geojson);
			//geojson = L.geoJson(hexGrid, {style: style}).addTo(map);
			geojson.setStyle(style);
		}
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
		if (styleRun == 1) {
			//map.removeLayer(geojson);
			//geojson = L.geoJson(hexGrid, {style: style}).addTo(map);
			geojson.setStyle(style);
		}
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
		if (styleRun == 1) {
			//map.removeLayer(geojson);
			//geojson = L.geoJson(hexGrid, {style: style}).addTo(map);
			geojson.setStyle(style);
		}
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

resource_value = '';

var slider = L.control.slider(function(value) {
		resource_value = value;
		if (styleRun == 1) {
			//map.removeLayer(geojson);
			//geojson = L.geoJson(hexGrid, {style: style}).addTo(map);
			geojson.setStyle(style);
		}
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

opacity_value = 0.3;

var slider = L.control.slider(function(value) {
   		opacity_value = value / 100;
		if (styleRun == 1) {
			//map.removeLayer(geojson); 
			//geojson = L.geoJson(hexGrid, {style: style}).addTo(map);
			geojson.setStyle(style);
		}
		
	//	geoJson.resetStyle;
	}, {
   	max: 100,
   	value: 30,
   	step:1,
   	size: '180px',
   	orientation:'horizontal',
	collapsed: false,
	position: 'topleft',
	title: 'Opacity',
	Logo: 'Opacity',
	id: "slider_5"
}).addTo(map);

// STYLING

function calculation(feature) {

	// Category 0 (restrictive)
		// Economy
		// Nature
		// Landscape
		// Resources	
	// Category A (unreceptive)
		// Economy
		// Nature
		var lowlands_area = 1 - feature.properties.lowlands_ratio;
		var wetlands_area = 1 - feature.properties.wetlands_ratio;
		var protected_nature_types_area = 1 -feature.properties.protected_nature_types_ratio;
		// Landscape
		var muncipality_road_area = 1 - feature.properties.municipality_road_ratio;
		var wind_farm_buffer_area = 1 - feature.properties.wind_turbine_site_ratio;
		// Resources
		var v2_soil_polution_area = 1 - feature.properties.v2_soil_polution_ratio;
		var raw_material_sites_area = 1 - feature.properties.raw_material_sites_ratio;
	
	// Category B (Limited)
		// Economy
		// Nature
		// Landscape
		// Resources
		var v1_soil_polution_area = 1 - feature.properties.v1_soil_polution_ratio;
		var drinking_water_area = 1 - feature.properties.drinking_water_interest_ratio;
	// Category C (Advantageous)
		// Economy
		var technical_areas_area = 1 - feature.properties.technical_areas_ratio;
		// Nature
		// Landscape
		// Resources	
	
	/*
	
	feature.properties.v1_soil_polution_ratio; Limited / resources
	feature.properties.municipality_road_ratio; unreceptive / landscape
	feature.properties.forest_reserve_ratio; restrictive / nature
	feature.properties.forest_ratio; restrictive / nature
	feature.properties.ramsar_area_ratio;  restrictive / nature
	feature.properties.nature_and_wildlife_sanctuary_ratio; restrictive / nature
	feature.properties.drinking_water_interest_ratio; limited / resources
	
	feature.properties.roadsides_ratio; restrictive / landscape
	feature.properties.lowlands_ratio; unreceptive / nature
	feature.properties.technical_areas_ratio; advantageuos / economy
	
	feature.properties.wind_turbine_site_ratio; unreceptive / ASSUMING ITS WIND_FARM_BUFFER
	feature.properties.church_protection_line_ratio; restrictive
	feature.properties.natural_bird_protection_ratio; restrictive
	feature.properties.lake_protection_line_ratio; restrictive
	feature.properties.state_road_ratio; restrictive
	feature.properties.edge_water_stream_ratio; restrictive
	feature.properties.dune_conservation_ratio; restrictive
	
	feature.properties.nature_registration_ratio; 
	
	feature.properties.beach_protection_ratio;
	
	feature.properties.v2_soil_polution_ratio; unreceptive / resource
	
	feature.properties.wind_turbine_ratio; restrictive
	
	feature.properties.raw_material_sites_ratio; unreceptive / resource
	
	feature.properties.wetlands_ratio; unreceptive / nature
	feature.properties.protected_water_streams_ratio; restrictive
	feature.properties.building_ratio; restrictive
	feature.properties.railroad_ratio; /restrictive
	feature.properties.coast_line_zone_ratio;
	feature.properties.burial_area_ratio;
	feature.properties.protected_nature_types_ratio;
	feature.properties.conservation_ratio;
	feature.properties.lakes_ratio;
	feature.properties.protected_earth_stone_dikes_ratio;
	feature.properties.natural_habitat_ratio;
	feature.properties.protected_ancient_sites_ratio;
	
	*/
	
	// Restricted areas
	var w_0 = 0.000;

	// Free areas
	var w_1 = 1.000;	
	
	// Unreceptive areas
	var w_a = 0.072;

	// Limiting areas
	var w_b = 0.279;

	// Advantageous areas
	var w_c = 0.649;

	
	// Economy slider / user value
	var x_1 = economy_value;
	
	// Nature slider / user value
	var x_2 = nature_value;
	
	// landscape slider / user value
	var x_3 = landscape_value;
	
	// Resource slider / user value
	var x_4 = resource_value;
	
	// Sum of slider / user values
	var x_sum = x_1 + x_2 + x_3 + x_4;
	
	// Hex area
	var A_Hex = 1.0;
		
	// Restricted area
	var A_0 = 0.3;
		
	// Free area
	var A_1 = 0.4; // needs to be calculated on the back-end, database
	
	// Category a areas (unreceptive)
	var A_a1 = 0;
	var A_a2 = lowlands_area + wetlands_area + protected_nature_types_area;
	var A_a3 = muncipality_road_area + wind_farm_buffer_area;
	var A_a4 = v2_soil_polution_area;
	var A_a = A_a1 + A_a2 + A_a3 + A_a4;
	
	// Category b areas (limited)
	var A_b1 = 0;
	var A_b2 = 0;
	var A_b3 = 0;
	var A_b4 = v1_soil_polution_area + drinking_water_area;	
	var A_b = A_b1 + A_b2 + A_b3 + A_b4;
	
	// Category c areas (advantageous)
	var A_c1 = technical_areas_area;
	var A_c2 = 0;
	var A_c3 = 0;
	var A_c4 = 0;	
	var A_c = A_c1 + A_c2 + A_c3 + A_c4;
	
	var A_standardized = (A_Hex - A_0) / (A_1 + A_a + A_b + A_c);
	
	var step_1 = w_1 * A_1 / (A_Hex - A_0);
	
	if (A_a > 0 && x_sum > 0) {
		var step_2_wa_1 = ((x_1 / x_sum) * (A_a1 / A_a)) + ((x_2 / x_sum) * (A_a2 / A_a));
		var step_2_wa_2 = step_2_wa_1 + ((x_3 / x_sum) * (A_a3 / A_a)) + ((x_4 / x_sum) * (A_a4 / A_a));
		var step_2_wa_3 = ((w_a + step_2_wa_2) * (A_a / (A_Hex - A_0))) / 2;
	} else {
		var step_2_wa_3 = 0;
	}
	
	if (A_b > 0 && x_sum > 0) {
		var step_3_wb_1 = ((x_1 / x_sum) * (A_b1 / A_b)) + ((x_2 / x_sum) * (A_b2 / A_b));
		var step_3_wb_2 = step_3_wb_1 + ((x_3 / x_sum) * (A_b3 / A_b)) + ((x_4 / x_sum) * (A_b4 / A_b));
		var step_3_wb_3 = ((w_b + step_3_wb_2) * (A_b / (A_Hex - A_0))) / 2;
	} else {
		var step_3_wb_3 = 0;
	}	
	
	if (A_c > 0 && x_sum > 0) {
		var step_4_wc_1 = ((x_1 / x_sum) * (A_c1 / A_c)) + ((x_2 / x_sum) * (A_c2 / A_c));
		var step_4_wc_2 = step_4_wc_1 + ((x_3 / x_sum) * (A_c3 / A_c)) + ((x_4 / x_sum) * (A_c4 / A_c));
		var step_4_wc_3 = ((w_c + step_4_wc_2) * (A_c / (A_Hex - A_0))) / 2;
	} else {
		var step_4_wc_3 = 0;
	}
	
	var S_k = A_standardized * (step_1 + step_2_wa_3 + step_3_wb_3 + step_4_wc_3)
	
	var V_k = (1 - (A_0 / A_Hex)) * S_k;
	
	//console.log(A_standardized)
	//console.log(step_1)
	//console.log(step_2_wa_3)
	//console.log(step_3_wb_3)
	//console.log(step_4_wc_3)
	
	//console.log(economy_value);
	//debugger;
//	console.log(nature_value);
//	console.log(resource_value);
//	console.log(landscape_value);
	
	// console.log(V_k);

	return V_k;
}

function getHexColor(value) {
    return value > 0.6 ? '#A6D96A':
	       value > 0.4 ? '#FFFFBF':
	       value > 0.2 ? '#FDAE61':
	                     '#D7191C';           
}

// value > 0.8 ? '#1A9641':

function style(feature) {
	styleRun = 1;
    return {
        fillColor: getHexColor(calculation(feature)),
        weight: 2,
        opacity: 0.4,
        color: 'white',
        dashArray: '3',
        fillOpacity: opacity_value
    };
}

function getMuniColor(muniString) {
	return muniString == 'Tekniske anlaeg' ? '#ffffb3':
	       muniString == 'Boligomraade' ? '#8dd3c7':
		   muniString == 'Blandet bolig og erhverv' ? '#bebada':
		   muniString == 'Erhvervsomraade' ? '#fb8072':
		   muniString == 'Landomraade' ? '#80b1d3':
		   muniString == 'Rekreativt omraade' ? '#b3de69':
		   muniString == 'Centeromraade' ? '#fdb426':
		   muniString == 'Sommerhusomraade' ? '#fccde5':
		                 '#d9d9d9';
												
}

function muniStyle(feature) {
    return {
        fillColor: getMuniColor(feature.properties.anvendelse),
        weight: 2,
        opacity: 0.4,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.8
    };
}

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
	// info.update(layer.feature.properties);
	panelUpdate(layer.feature.properties);
	
	prevClickedLayer = layer;
}

function onEachFeature(feature, layer) {
	layer.on({
		click: highlightFeature,
	});
}

// Adding the geojson hexagon-layer

geojson = L.geoJson(hexGrid, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);


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


// INFO CONTROL

var jsPanel = document.querySelector('#info-panel-body');

function panelUpdate(props) {
	if ((1 - props.beach_protection_ratio) > 0) {
		var beachProtection = '<br />' + 'Beach protection ' + ((1 - props.beach_protection_ratio) * 100).toFixed(2) + ' %';
	} else {
		var beachProtection = '';
	}
	
	if ((1 - props.lowlands_ratio) > 0) {
		var lowlands = '<br />' + 'Lowlands ' + ((1 - props.lowlands_ratio) * 100).toFixed(2) + ' %';
	} else {
		var lowlands = '';
	}
	
	if ((1 - props.wetlands_ratio) > 0) {
		var wetlands = '<br />' + 'Wetlands ' + ((1 - props.wetlands_ratio) * 100).toFixed(2) + ' %';
	} else {
		var wetlands = '';
	}

	if ((1 - props.protected_nature_types_ratio) > 0) {
		var protectedNatureTypes = '<br />' + 'Protected nature types ' + ((1 - props.protected_nature_types_ratio) * 100).toFixed(2) + ' %';
	} else {
		var protectedNatureTypes = '';
	}

	if ((1 - props.municipality_road_ratio) > 0) {
		var municipalityRoads = '<br />' + 'Municipality roads ' + ((1 - props.municipality_road_ratio) * 100).toFixed(2) + ' %';
	} else {
		var municipalityRoads = '';
	}

	if ((1 - props.wind_turbine_site_ratio) > 0) {
		var windTurbineFarm = '<br />' + 'Wind farms ' + ((1 - props.wind_turbine_site_ratio) * 100).toFixed(2) + ' %';
	} else {
		var windTurbineFarm = '';
	}

	if ((1 - props.v2_soil_polution_ratio) > 0) {
		var v2SoilPollution = '<br />' + 'V2 soil pollution ' + ((1 - props.v2_soil_polution_ratio) * 100).toFixed(2) + ' %';
	} else {
		var v2SoilPollution = '';
	}

	if ((1 - props.raw_material_sites_ratio) > 0) {
		var rawMaterialSite = '<br />' + 'Raw material sites ' + ((1 - props.raw_material_sites_ratio) * 100).toFixed(2) + ' %';
	} else {
		var rawMaterialSite = '';
	}	
    jsPanel.innerHTML = '<h4>Hexagon information</h4>' +  (props ?
        '<b>' + 'Hex no. ' + props.gid + '</b>' +
		beachProtection +
		lowlands +
		wetlands +
		protectedNatureTypes +
		municipalityRoads +
		windTurbineFarm +
		v2SoilPollution +
		rawMaterialSite 
        : 'Click a hexagon');
};


// LEGEND

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0.2, 0.4, 0.6, 0.8],
        labels = ['Restrictive', 'Unreceptive', 'Limited', 'Advantageous'];

    // loop through our weights and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getHexColor(grades[i]) + '"></i> ' +
            labels[i] + '<br>';
    }

    return div;
};

legend.addTo(map);


// Scale

L.control.scale({
	maxWidth: 200,
	imperial: false
}).addTo(map);

// Adding control layer box with municipal framework in it

var geoJsonMuni = L.geoJson(muniFrame, {style: muniStyle}).addTo(map);

var overlayMaps = {
	"Municipality framework": geoJsonMuni,
	"Hexagons": geojson
};

L.control.layers(null, overlayMaps).addTo(map);

$('#click').click(function()
{   
    $("#info_panel").toggle();     
});


/*
var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
    denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
    aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
    golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');
	
var cities = L.layerGroup([littleton, denver, aurora, golden]);

var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';

var grayscale = L.tileLayer(mbUrl, {id: 'MapID', attribution: mbAttr}),
    streets   = L.tileLayer(mbUrl, {id: 'MapID', attribution: mbAttr});
	
var baseMaps = {
    "Grayscale": grayscale,
    "Streets": streets
};

var overlayMaps = {
    "Cities": cities
};

L.control.layers(baseMaps, overlayMaps).addTo(map);
*/

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



function init_geojson(n) {
	console.log(geojson.options);
	map.removeLayer(geojson);
	if (n != "") {
		sn = n;
		console.log(sn);
		geojson = L.geoJson(statesData, {
		style: style
		}).addTo(map);
	}
}

function style(feature) {
	console.log(sn);
	if (sn == feature.properties.name) {
		return {
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.3,
			fillColor: '#ff0000'
		};
	} else {
		return {
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.3,
			fillColor: '#666666'
		};
	}
 }



*/


/*
economy_slider.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'economy_slider', document.body);
    return this._div;
}
*/


/*
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
*/

/*
function sliderUpdate(oldValue, newValue) {
	if (oldValue != newValue) {
		geojson.setStyle(style(feature))
	}
}
*/


/*
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
*/


