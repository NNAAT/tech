// Setting center and zoom level of the map
var map = L.map('map').setView([56.28453, 10.45761], 12);

// WMS-service is loaded in from Mapbox
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

// The transparency of the map
var opacity_value = 0.3;

// Variable that ensures that sliders are not setting geoJson style before the layer is actually added
var styleRun = 0;

// Designing and adding economy slider
var economy_slider = L.control.slider(function(value) {
   		economy_value = value;
		if (styleRun == 1) {
			geoJsonHex.setStyle(style);
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

// Designing and adding the nature slider
var nature_slider = L.control.slider(function(value) {
   		nature_value = value;
		if (styleRun == 1) {
			geoJsonHex.setStyle(style);
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

// Designing and adding the landscape slider
var landscape_slider = L.control.slider(function(value) {
   		landscape_value = value;
		if (styleRun == 1) {
			geoJsonHex.setStyle(style);
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

// Designing and adding the resource slider
var resource_slider = L.control.slider(function(value) {
		resource_value = value;
		if (styleRun == 1) {
			geoJsonHex.setStyle(style);
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

// Designing and adding the opacity slider
var opacity_slider = L.control.slider(function(value) {
   		opacity_value = value / 100;
		if (styleRun == 1) {
			geoJsonHex.setStyle(style);
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

// Calculation based on the equation from the report, return a value that will determine the color of a hexagon
function calculation(feature) {

	// Category 0 (restrictive)
		var restricted_area = 1 - (feature.properties.available_area / feature.properties.shape_area);

	// Category A (unreceptive)
		// Economy
			var wind_speed_unreceptive = feature.properties.wind_speed_unreceptive_ratio; //
		// Nature
			var lowlands_area = feature.properties.lowlands_ratio;
			var wetlands_area = feature.properties.wetlands_ratio;
			var protected_nature_types_area = feature.properties.protected_nature_types_ratio;
		// Landscape
			var muncipality_road_area = feature.properties.municipality_road_ratio;
			var wind_farm_buffer_area = feature.properties.wind_turbine_site_ratio;
		// Resources
			var v2_soil_polution_area = feature.properties.v2_soil_polution_ratio;
			var raw_material_sites_area = feature.properties.raw_material_sites_ratio;

	// Category B (Limited)
		// Economy
			var wind_speed_limited = feature.properties.wind_speed_limited_ratio; //
		// Nature
		// Landscape
		// Resources
			var v1_soil_polution_area = feature.properties.v1_soil_polution_ratio;
			var drinking_water_area = feature.properties.drinking_water_interest_ratio;
	// Category C (Advantageous)
		// Economy
			var wind_speed_advantageous = feature.properties.wind_speed_advantageous_ratio; //
			var technical_areas_area = feature.properties.technical_areas_ratio;
		// Nature
		// Landscape
		// Resources

	// Values given to the categories

	// Restricted areas, category 0
	var w_0 = 0.000;

	// Free areas, non-categorized (same value as advantageous)
	var w_1 = 0.649;

	// Unreceptive areas, category A
	var w_a = 0.072;

	// Limiting areas, category B
	var w_b = 0.279;

	// Advantageous areas, category C
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

	// Hex area, 100 % of the area.
	var A_Hex = 1.0;

	// Restricted area
	var A_0 = restricted_area;

	// Free area
	var A_1 = feature.properties.uncovered_area_ratio;

	// Category a areas (unreceptive)
	var A_a1 = wind_speed_unreceptive;
	var A_a2 = lowlands_area + wetlands_area + protected_nature_types_area;
	var A_a3 = muncipality_road_area + wind_farm_buffer_area;
	var A_a4 = v2_soil_polution_area;
	var A_a = A_a1 + A_a2 + A_a3 + A_a4;

	// Category b areas (limited)
	var A_b1 = wind_speed_limited;
	var A_b2 = 0;
	var A_b3 = 0;
	var A_b4 = v1_soil_polution_area + drinking_water_area;
	var A_b = A_b1 + A_b2 + A_b3 + A_b4;

	// Category c areas (advantageous)
	var A_c1 = wind_speed_advantageous + technical_areas_area;
	var A_c2 = 0;
	var A_c3 = 0;
	var A_c4 = 0;
	var A_c = A_c1 + A_c2 + A_c3 + A_c4;

	// Calculating the part which standardizes the formula result (keeps it between 0 and 1)
	// If statement to ensure dividing by zero is not an option
	if (A_1 > 0 || A_a > 0 || A_b > 0 || A_c > 0) {
		var A_standardized = (A_Hex - A_0) / (A_1 + A_a + A_b + A_c);
	} else {
		var A_standardized = 0;
	}

	// Calculating the influence of free areas
	// If statement to ensure dividing by zero is not an option
	if (A_0 < 0.998) {
		var step_1 = w_1 * A_1 / (A_Hex - A_0);
	} else {
		var step_1 = 0;
	}

	// Calculating the influence from category A and first part of the slider values
	// If statement to ensure dividing by zero is not an option
	if (A_a > 0 && x_sum > 0 && A_0 < 0.9998) {
		var step_2_wa_1 = ((x_1 / x_sum) * (A_a1 / A_a)) + ((x_2 / x_sum) * (A_a2 / A_a));
		var step_2_wa_2 = step_2_wa_1 + ((x_3 / x_sum) * (A_a3 / A_a)) + ((x_4 / x_sum) * (A_a4 / A_a));
		var step_2_wa_3 = ((w_a + step_2_wa_2) * (A_a / (A_Hex - A_0))) / 2;
	} else {
		var step_2_wa_3 = 0;
	}

	// Calculating the influence from category B and second part of the slider values
	// If statement to ensure dividing by zero is not an option
	if (A_b > 0 && x_sum > 0 && A_0 < 0.9998) {
		var step_3_wb_1 = ((x_1 / x_sum) * (A_b1 / A_b))+ ((x_2 / x_sum) * (A_b2 / A_b));
		var step_3_wb_2 = step_3_wb_1 + ((x_3 / x_sum) * (A_b3 / A_b)) + ((x_4 / x_sum) * (A_b4 / A_b));
		var step_3_wb_3 = ((w_b + step_3_wb_2) * (A_b / (A_Hex - A_0))) / 2;
	} else {
		var step_3_wb_3 = 0;
	}

	// Calculating the influence from category C and last part of the slider values
	// If statement to ensure dividing by zero is not an option
	if (A_c > 0 && x_sum > 0 && A_0 < 0.9998) {
		var step_4_wc_1 = ((x_1 / x_sum) * (A_c1 / A_c)) + ((x_2 / x_sum) * (A_c2 / A_c));
		var step_4_wc_2 = step_4_wc_1 + ((x_3 / x_sum) * (A_c3 / A_c)) + ((x_4 / x_sum) * (A_c4 / A_c));
		var step_4_wc_3 = ((w_c + step_4_wc_2) * (A_c / (A_Hex - A_0))) / 2;
	} else {
		var step_4_wc_3 = 0;
	}

	// The influence from all categories are summarized and standardized
	var S_k = A_standardized * (step_1 + step_2_wa_3 + step_3_wb_3 + step_4_wc_3)

	// The restrictive area is added into the equation giving the final result
	var V_k = (1 - (A_0 / A_Hex)) * S_k;

	return V_k;
}

// Returning a hex color depending on the inserted value
function getHexColor(value) {
    return value > (0.108) ? '#A6D96A':
	       value > (0.072) ? '#FFFFBF':
	       value > (0.036) ? '#FDAE61':
	                                       '#D7191C';
}

// Styling of the hexagons: Used when drawing the layer and changing values with sliders
// Depends on the functions: getHexColor and calculation
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

// Returning hex colors for municipality framework depending on the attribute it represents: muniString.
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

// Styling of municipality framewrok
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

// variable used to find out if a hexagon has been clicked earlier
var prevClickedLayer;


// Function called from, onEachFeature. This means that this function is called whenever a hexagon is clicked
function highlightFeature(e) {
	// When there is a hexagon that has been clicked previously its style will be reset
	if (prevClickedLayer) {
		geoJsonHex.resetStyle(prevClickedLayer);
	}

	// the layer variable is set to the clicked hexagon
	var layer = e.target;

	// Change the style of the clicked hexagon
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

	// Code taken from Leaflet tutorial that ensures that highlight is brough to the front on browsers: internet explorer, opera and edge
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

	// Gives the properties of the hexagon to the panelUpdate function
	panelUpdate(layer.feature.properties);

	// Stores the hexagon in a global variable, so it later can be identified and reset to its original style
	prevClickedLayer = layer;
}

// function that is called when clicking a hexagon
function onEachFeature(feature, layer) {
	layer.on({
		click: highlightFeature,
	});
}

// Now the style and events for the hexGrid have been defined, and the layer itself can therefore be added
geoJsonHex = L.geoJson(hexGrid, {
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

// Takes in a string and a desired length. The function fills in white space until the desired length has been achieved.
function insertWhiteSpace(string, length) {
	if (string.length < length) {
		for (i = 0; i < (length - string.length); i++) {
			string += '\u00A0';
		}
	} else {
		string = string;
	}

	return string;
}

// Defining the variable for the info panel's body
var jsPanel = document.querySelector('#info-panel-body');

// Gives information on how much of a hexagon is covered by different layers
// Called whenever a hexagon is clicked
function panelUpdate(props) {
	// Layers are listed if they cover anything of the hexagon. It's displayed in percentage with 2 decimals.

	if ((props.lowlands_ratio) > 0) {
		var lowlands = '<br />' + 'Lowlands';
		lowlands = insertWhiteSpace(lowlands, 81);
		lowlands += ': ' + ((props.lowlands_ratio) * 100).toFixed(2) + ' %';
	} else {
		var lowlands = '';
	}

	if ((props.wetlands_ratio) > 0) {
		var wetlands = '<br />' + 'Wetlands';
		wetlands = insertWhiteSpace(wetlands, 82);
		wetlands += ': ' + ((props.wetlands_ratio) * 100).toFixed(2) + ' %';
	} else {
		var wetlands = '';
	}

	if ((1 - props.protected_nature_types_ratio) > 0) {
		var protectedNatureTypes = '<br />' + 'Protected nature types';
		protectedNatureTypes = insertWhiteSpace(protectedNatureTypes, 53);
		protectedNatureTypes += ': ' + ((1 - props.protected_nature_types_ratio) * 100).toFixed(2) + ' %';
		
	} else {
		var protectedNatureTypes = '';
	}

	if ((props.municipality_road_ratio) > 0) {		
		var municipalityRoads = '<br />' + 'Municipality roads';
		municipalityRoads = insertWhiteSpace(municipalityRoads, 65);
		municipalityRoads += ': ' + ((props.municipality_road_ratio) * 100).toFixed(2) + ' %';
	} else {
		var municipalityRoads = '';
	}

	if ((props.wind_turbine_site_ratio) > 0) {
		var windTurbineFarm = '<br />' + 'Wind farms';
		windTurbineFarm = insertWhiteSpace(windTurbineFarm, 78);
		windTurbineFarm += ': ' + ((props.wind_turbine_site_ratio) * 100).toFixed(2) + ' %';
	} else {
		var windTurbineFarm = '';
	}

	if ((props.v2_soil_polution_ratio) > 0) {
		var v2SoilPollution = '<br />' + 'V2 soil pollution';
		v2SoilPollution = insertWhiteSpace(v2SoilPollution, 71);
		v2SoilPollution += ': ' + ((props.v2_soil_polution_ratio) * 100).toFixed(2) + ' %';
	} else {
		var v2SoilPollution = '';
	}

	if ((props.v1_soil_polution_ratio) > 0) {
		var v1SoilPollution = '<br />' + 'V1 soil pollution';
		v1SoilPollution = insertWhiteSpace(v1SoilPollution, 71);
		v1SoilPollution += ': ' + ((props.v1_soil_polution_ratio) * 100).toFixed(2) + ' %';
	} else {
		var v1SoilPollution = '';
	}

	if ((props.raw_material_sites_ratio) > 0) {
		var rawMaterialSite = '<br />' + 'Raw material sites';
		rawMaterialSite = insertWhiteSpace(rawMaterialSite, 64);
		rawMaterialSite += ': ' + ((props.raw_material_sites_ratio) * 100).toFixed(2) + ' %';
	} else {
		var rawMaterialSite = '';
	}

	if ((1 - props.forest_reserve_ratio) > 0) {
		var forestReserve = '<br />' + 'Forest reserve areas';
		forestReserve = insertWhiteSpace(forestReserve, 58);
		forestReserve += ': ' + ((1 - props.forest_reserve_ratio) * 100).toFixed(2) + ' %';
	} else {
		var forestReserve = '';
	}

	if ((1 - props.forest_ratio) > 0) {
		var forest = '<br />' + 'Forest';
		forest = insertWhiteSpace(forest, 89);
		forest += ': ' + ((1 - props.forest_ratio) * 100).toFixed(2) + ' %';
	} else {
		var forest = '';
	}

	if ((1 - props.ramsar_area_ratio) > 0) {
		var ramsar = '<br />' + 'Ramsar areas';
		ramsar = insertWhiteSpace(ramsar, 70);
		ramsar += ': ' + ((1 - props.ramsar_area_ratio) * 100).toFixed(2) + ' %';
	} else {
		var ramsar = '';
	}

	if ((1 - props.nature_and_wildlife_sanctuary_ratio) > 0) {
		var natureWildlifeSanctuary = '<br />' + 'Nature and wildlife sanctuary';
		natureWildlifeSanctuary = insertWhiteSpace(natureWildlifeSanctuary, 41);
		natureWildlifeSanctuary += ': ' + ((1 - props.nature_and_wildlife_sanctuary_ratio) * 100).toFixed(2) + ' %';
	} else {
		var natureWildlifeSanctuary = '';
	}

	if ((props.drinking_water_interest_ratio) > 0) {
		var drinkingWaterInterests = '<br />' + 'Drinking water interests';
		drinkingWaterInterests = insertWhiteSpace(drinkingWaterInterests, 51);
		drinkingWaterInterests += ': ' + ((props.drinking_water_interest_ratio) * 100).toFixed(2) + ' %';
	} else {
		var drinkingWaterInterests = '';
	}

	if ((1 - props.roadsides_ratio) > 0) {
		var roadsides = '<br />' + 'Roadsides';
		roadsides = insertWhiteSpace(roadsides, 78);
		roadsides += ': ' + ((1 - props.roadsides_ratio) * 100).toFixed(2) + ' %';
	} else {
		var roadsides = '';
	}

	if ((props.technical_areas_ratio) > 0) {
		var technicalAreas = '<br />' + 'Technical areas';
		technicalAreas = insertWhiteSpace(technicalAreas, 68);
		technicalAreas += ': ' + ((props.technical_areas_ratio) * 100).toFixed(2) + ' %';
	} else {
		var technicalAreas = '';
	}

	if ((props.wind_speed_unreceptive_ratio) > 0) {
		var windSpeedUnreceptive = '<br />' + 'Low average wind speeds';
		windSpeedUnreceptive = insertWhiteSpace(windSpeedUnreceptive, 43);
		windSpeedUnreceptive += ': ' + ((props.wind_speed_unreceptive_ratio) * 100).toFixed(2) + ' %';
	} else {
		var windSpeedUnreceptive = '';
	}

	if ((props.wind_speed_limited_ratio) > 0) {
		var windSpeedLimited = '<br />' + 'Medium average wind speeds';
		windSpeedLimited = insertWhiteSpace(windSpeedLimited, 34);
		windSpeedLimited += ': ' + ((props.wind_speed_limited_ratio) * 100).toFixed(2) + ' %';
	} else {
		var windSpeedLimited = '';
	}

	if ((props.wind_speed_advantageous_ratio) > 0) {
		var windSpeedAdvantageous = '<br />' + 'High average wind speeds';
		windSpeedAdvantageous = insertWhiteSpace(windSpeedAdvantageous, 43);
		windSpeedAdvantageous += ': ' + ((props.wind_speed_advantageous_ratio) * 100).toFixed(2) + ' %';
	} else {
		var windSpeedAdvantageous = '';
	}

	if ((props.church_protection_line_ratio) > 0) {
		var churchProtection = '<br />' + 'Church protection line';
		churchProtection = insertWhiteSpace(churchProtection, 55);
		churchProtection += ': ' + ((props.church_protection_line_ratio) * 100).toFixed(2) + ' %';
	} else {
		var churchProtection = '';
	}

	if ((1 - props.natural_bird_protection_ratio) > 0) {
		var naturalBirdProtection = '<br />' + 'Natural bird protection';
		naturalBirdProtection = insertWhiteSpace(naturalBirdProtection, 56);
		naturalBirdProtection += ': ' + ((1 - props.natural_bird_protection_ratio) * 100).toFixed(2) + ' %';
	} else {
		var naturalBirdProtection = '';
	}

	if ((props.lake_protection_line_ratio) > 0) {
		var lakeProtection = '<br />' + 'Lake protection line';
		lakeProtection = insertWhiteSpace(lakeProtection, 61);
		lakeProtection += ': ' + ((props.lake_protection_line_ratio) * 100).toFixed(2) + ' %';
	} else {
		var lakeProtection = '';
	}

	if ((1 - props.state_road_ratio) > 0) {
		var stateRoad = '<br />' + 'State roads';
		stateRoad = insertWhiteSpace(stateRoad, 78);
		stateRoad += ': ' + ((1 - props.state_road_ratio) * 100).toFixed(2) + ' %';
	} else {
		var stateRoad = '';
	}

	if ((1 - props.edge_water_stream_ratio) > 0) {
		var waterStream = '<br />' + 'Water streams';
		waterStream = insertWhiteSpace(waterStream, 70);
		waterStream += ': ' + ((1 - props.edge_water_stream_ratio) * 100).toFixed(2) + ' %';
	} else {
		var waterStream = '';
	}

	if ((1 - props.dune_conservation_ratio) > 0) {
		var duneConservation = '<br />' + 'Dune conservation';
		duneConservation = insertWhiteSpace(duneConservation, 63);
		duneConservation += ': ' + ((1 - props.dune_conservation_ratio) * 100).toFixed(2) + ' %';
	} else {
		var duneConservation = '';
	}

	if ((props.beach_protection_ratio) > 0) {
		var beachProtection = '<br />' + 'Beach protection';
		beachProtection = insertWhiteSpace(beachProtection, 67);
		beachProtection += ': ' + ((props.beach_protection_ratio) * 100).toFixed(2) + ' %';
	} else {
		var beachProtection = '';
	}

	if ((1 - props.wind_turbine_ratio) > 0) {
		var windTurbineTooClose = '<br />' + 'Wind turbine rotor too close';
		windTurbineTooClose = insertWhiteSpace(windTurbineTooClose, 45);
		windTurbineTooClose += ': ' + ((1 - props.wind_turbine_ratio) * 100).toFixed(2) + ' %';
	} else {
		var windTurbineTooClose = '';
	}

	if ((1 - props.building_ratio) > 0) {
		var buildings = '<br />' + 'Buildings';
		buildings = insertWhiteSpace(buildings, 84);
		buildings += ': ' + ((1 - props.building_ratio) * 100).toFixed(2) + ' %';
	} else {
		var buildings = '';
	}

	if ((1 - props.railroad_ratio) > 0) {
		var railroad = '<br />' + 'Railroad';
		railroad = insertWhiteSpace(railroad, 87);
		railroad += ': ' + ((1 - props.railroad_ratio) * 100).toFixed(2) + ' %';
	} else {
		var railroad = '';
	}

	if ((props.coast_line_zone_ratio) > 0) {
		var coastLine = '<br />' + 'Coast line';
		coastLine = insertWhiteSpace(coastLine, 84);
		coastLine += ': ' + ((props.coast_line_zone_ratio) * 100).toFixed(2) + ' %';
	} else {
		var coastLine = '';
	}

	if ((1 - props.burial_area_ratio) > 0) {
		var burialArea = '<br />' + 'Burial area';
		burialArea = insertWhiteSpace(burialArea, 82);
		burialArea += ': ' + ((1 - props.burial_area_ratio) * 100).toFixed(2) + ' %';
	} else {
		var burialArea = '';
	}

	if ((1 - props.conservation_ratio) > 0) {
		var conservation = '<br />' + 'Conservated area';
		conservation = insertWhiteSpace(conservation, 66);
		conservation += ': ' + ((1 - props.conservation_ratio) * 100).toFixed(2) + ' %';
	} else {
		var conservation = '';
	}

	if ((props.forest_protection_line_ratio) > 0) {
		var forestProtection = '<br />' + 'Forest protection line';
		forestProtection = insertWhiteSpace(forestProtection, 61);
		forestProtection += ': ' + ((props.forest_protection_line_ratio) * 100).toFixed(2) + ' %';
	} else {
		var forestProtection = '';
	}

	if ((1 - props.lakes_ratio) > 0) {
		var lakes = '<br />' + 'Lakes';
		lakes = insertWhiteSpace(lakes, 92);
		lakes += ': ' + ((1 - props.lakes_ratio) * 100).toFixed(2) + ' %';
	} else {
		var lakes = '';
	}

	if ((props.protected_earth_stone_dikes_ratio) > 0) {
		var earthAndStoneDikes = '<br />' + 'Earth and stone dikes';
		earthAndStoneDikes = insertWhiteSpace(earthAndStoneDikes, 56);
		earthAndStoneDikes += ': ' + ((props.protected_earth_stone_dikes_ratio) * 100).toFixed(2) + ' %';
	} else {
		var earthAndStoneDikes = '';
	}

	if ((1 - props.natural_habitat_ratio) > 0) {
		var naturalHabitat = '<br />' + 'Natural habitat';
		naturalHabitat = insertWhiteSpace(naturalHabitat, 74);
		naturalHabitat += ': ' + ((1 - props.natural_habitat_ratio) * 100).toFixed(2) + ' %';
	} else {
		var naturalHabitat = '';
	}

	if ((1 - props.protected_ancient_sites_ratio) > 0) {
		var ancientSites = '<br />' + 'Ancient sites';
		ancientSites = insertWhiteSpace(ancientSites, 78);
		ancientSites += ': ' + ((1 - props.protected_ancient_sites_ratio) * 100).toFixed(2) + ' %';
	} else {
		var ancientSites = '';
	}

	// Adding all the string variables to the info panel
    jsPanel.innerHTML = '<h4>Hexagon information</h4>' +  (props ?
        '<b>' + 'Hex no. ' + props.gid + '</b>' +
		lowlands +
		wetlands +
		protectedNatureTypes +
		municipalityRoads +
		windTurbineFarm +
		v2SoilPollution +
		v1SoilPollution +
		rawMaterialSite +
		forestReserve +
		forest +
		ramsar +
		natureWildlifeSanctuary +
		drinkingWaterInterests +
		roadsides +
		technicalAreas +
		windSpeedUnreceptive +
		windSpeedLimited +
		windSpeedAdvantageous +
		churchProtection +
		naturalBirdProtection +
		lakeProtection +
		stateRoad +
		waterStream +
		duneConservation +
		beachProtection +
		windTurbineTooClose +
		buildings +
		railroad +
		coastLine +
		burialArea +
		conservation +
		forestProtection +
		lakes +
		earthAndStoneDikes +
		naturalHabitat +
		ancientSites
        : 'Click a hexagon');
};


// LEGEND

var legendHex = L.control({position: 'bottomright'});

legendHex.onAdd = function(map) {

    var div = L.DomUtil.create('div', 'infoHex legendHex'),
        hexGrades = [0.000, 0.037, 0.073, 0.109],
        hexLabels = ['Restrictive', 'Unreceptive', 'Limited', 'Advantageous'];

    // loop through our weights and generate a label with a colored square for each interval
    for (var i = 0; i < hexGrades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getHexColor(hexGrades[i]) + '"></i> ' +
            hexLabels[i] + '<br>';
    }

    return div;
};

// Is added from the start like the hex-layer
legendHex.addTo(map);

var legendMuni = L.control({position: 'bottomright'});

legendMuni.onAdd = function(map) {

    var div = L.DomUtil.create('div', 'infoMuni legendMuni'),
        grades = ['Tekniske anlaeg', 'Boligomraade', 'Blandet bolig og erhverv',
					'Erhvervsomraade', 'Landomraade', 'Rekreativt omraade',
					'Centeromraade', 'Sommerhusomraade', 'Omraade til offentlige formaal'],
        labels = ['Technical facilities', 'Residential area', 'Mixed residential and industrial areas',
             		'Industrial areas', 'Land area', 'Recreation area', 'Center area',
					'Summer cottage areas', 'Area for public purposes'];

    // loop through our weights and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getMuniColor(grades[i]) + '"></i> ' +
            labels[i] + '<br>';
    }

    return div;
};


// SCALE

L.control.scale({
	maxWidth: 200,
	imperial: false
}).addTo(map);

// Storing the municipality frame in a variable
var geoJsonMuni = L.geoJson(muniFrame, {style: muniStyle});

// Adding municipality framework and hexagon layer as overlaymaps
var overlayMaps = {
	"Municipality framework": geoJsonMuni,
	"Hexagons": geoJsonHex
};

// Create Leaflet layer control with the overlaymaps within it
L.control.layers(null, overlayMaps).addTo(map);

map.on('overlayadd', onOverlayAdd);
map.on('overlayremove', onOverlayRemove);

function onOverlayAdd(e){
	if(e.name == "Hexagons"){
		legendHex.addTo(map);
	} else if (e.name == "Municipality framework") {
		legendMuni.addTo(map);
	}
}

function onOverlayRemove(e){
	if(e.name == "Hexagons"){
		map.removeControl(legendHex);
	} else if (e.name == "Municipality framework") {
		map.removeControl(legendMuni);
	}
}
