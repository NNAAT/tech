---- These queries return two columns; hexagon id and total free space calculated for the affected hexagons----
---Layers not included; wind ressource layer, wind turbines, zones in denmark---

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(beach_protection.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS beach_protection
FROM hexgrid_150, beach_protection
WHERE st_intersects(hexgrid_150.geom, beach_protection.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(buildings.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS buildings
FROM hexgrid_150, buildings
WHERE st_intersects(hexgrid_150.geom, buildings.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(burial_areas.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS burial_areas
FROM hexgrid_150, burial_areas
WHERE st_intersects(hexgrid_150.geom, burial_areas.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(church_protection_line.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS church_protection_line
FROM hexgrid_150, church_protection_line
WHERE st_intersects(hexgrid_150.geom, church_protection_line.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(coast_line_zone.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS coast_line_zone
FROM hexgrid_150, coast_line_zone
WHERE st_intersects(hexgrid_150.geom, coast_line_zone.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(conservation.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS conservation
FROM hexgrid_150, conservation
WHERE st_intersects(hexgrid_150.geom, conservation.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(district_plan.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS district_plan
FROM hexgrid_150, district_plan
WHERE st_intersects(hexgrid_150.geom, district_plan.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(drinking_water_interests.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS drinking_water_interests
FROM hexgrid_150, drinking_water_interests
WHERE st_intersects(hexgrid_150.geom, drinking_water_interests.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(dune_conservation.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS dune_conservation
FROM hexgrid_150, dune_conservation
WHERE st_intersects(hexgrid_150.geom, dune_conservation.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(edge_water_stream.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS edge_water_stream
FROM hexgrid_150, edge_water_stream
WHERE st_intersects(hexgrid_150.geom, edge_water_stream.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(forest.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS forest
FROM hexgrid_150, forest
WHERE st_intersects(hexgrid_150.geom, forest.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(forest_protection_line.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS forest_protection_line
FROM hexgrid_150, forest_protection_line
WHERE st_intersects(hexgrid_150.geom, forest_protection_line.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(forest_reserve.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS forest_reserve
FROM hexgrid_150, forest_reserve
WHERE st_intersects(hexgrid_150.geom, forest_reserve.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(lake_protection_line.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS lake_protection_line
FROM hexgrid_150, lake_protection_line
WHERE st_intersects(hexgrid_150.geom, lake_protection_line.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(lakes.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS lakes
FROM hexgrid_150, lakes
WHERE st_intersects(hexgrid_150.geom, lakes.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(lowlands.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS lowlands
FROM hexgrid_150, lowlands
WHERE st_intersects(hexgrid_150.geom, lowlands.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(municipal_plan.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS municipal_plan
FROM hexgrid_150, municipal_plan
WHERE st_intersects(hexgrid_150.geom, municipal_plan.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(municipal_plan.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS municipal_plan
FROM hexgrid_150, municipal_plan
WHERE st_intersects(hexgrid_150.geom, municipal_plan.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(natura2000_bird_protection.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS natura2000_bird_protection
FROM hexgrid_150, natura2000_bird_protection
WHERE st_intersects(hexgrid_150.geom, natura2000_bird_protection.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(natura2000_habitat.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS natura2000_habitat
FROM hexgrid_150, natura2000_habitat
WHERE st_intersects(hexgrid_150.geom, natura2000_habitat.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(nature_and_wildlife_sanctuary.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS nature_and_wildlife_sanctuary
FROM hexgrid_150, nature_and_wildlife_sanctuary
WHERE st_intersects(hexgrid_150.geom, nature_and_wildlife_sanctuary.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(nature_registration.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS nature_registration
FROM hexgrid_150, nature_registration
WHERE st_intersects(hexgrid_150.geom, nature_registration.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(protected_ancient_sites.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS protected_ancient_sites
FROM hexgrid_150, protected_ancient_sites
WHERE st_intersects(hexgrid_150.geom, protected_ancient_sites.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(protected_nature_types.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS protected_nature_types
FROM hexgrid_150, protected_nature_types
WHERE st_intersects(hexgrid_150.geom, protected_nature_types.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(protected_stone_and_earth_dikes.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS protected_stone_and_earth_dikes
FROM hexgrid_150, protected_stone_and_earth_dikes
WHERE st_intersects(hexgrid_150.geom, protected_stone_and_earth_dikes.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(protected_water_streams.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS protected_water_streams
FROM hexgrid_150, protected_water_streams
WHERE st_intersects(hexgrid_150.geom, protected_water_streams.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(railroad.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS railroad
FROM hexgrid_150, railroad
WHERE st_intersects(hexgrid_150.geom, railroad.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(ramsar_area.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS ramsar_area
FROM hexgrid_150, ramsar_area
WHERE st_intersects(hexgrid_150.geom, ramsar_area.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(raw_material_sites.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS raw_material_sites
FROM hexgrid_150, raw_material_sites
WHERE st_intersects(hexgrid_150.geom, raw_material_sites.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(roadsides.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS roadsides
FROM hexgrid_150, roadsides
WHERE st_intersects(hexgrid_150.geom, roadsides.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(sfl_areas.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS sfl_areas
FROM hexgrid_150, sfl_areas
WHERE st_intersects(hexgrid_150.geom, sfl_areas.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(stream_protection_line.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS stream_protection_line
FROM hexgrid_150, stream_protection_line
WHERE st_intersects(hexgrid_150.geom, stream_protection_line.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(technical_areas.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS technical_areas
FROM hexgrid_150, technical_areas
WHERE st_intersects(hexgrid_150.geom, technical_areas.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(v1_soil_polution.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS v1_soil_polution
FROM hexgrid_150, v1_soil_polution
WHERE st_intersects(hexgrid_150.geom, v1_soil_polution.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(v2_soil_polution.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS v2_soil_polution
FROM hexgrid_150, v2_soil_polution
WHERE st_intersects(hexgrid_150.geom, v2_soil_polution.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(wetlands.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS wetlands
FROM hexgrid_150, wetlands
WHERE st_intersects(hexgrid_150.geom, wetlands.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;

SELECT hexgrid_150.objectid, 
1-((st_area(st_union(st_intersection(wetlands.geom, hexgrid_150.geom)))/hexgrid_150.shape_area)) 
AS wetlands
FROM hexgrid_150, wetlands
WHERE st_intersects(hexgrid_150.geom, wetlands.geom)=true
GROUP BY hexgrid_150.objectid, hexgrid_150.shape_area;











