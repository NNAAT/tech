SELECT beach_protection.*, 
       municipality_cut_layer 
INTO   final_beach_protection 
FROM   municipality_cut_layer 
       INNER JOIN beach_protection 
               ON St_contains(municipality_cut_layer.geom, 
                  beach_protection.geom); 

DROP TABLE IF EXISTS beach_protection; 

ALTER TABLE final_beach_protection 
  RENAME TO beach_protection; 

SELECT buildings.*, 
       municipality_cut_layer 
INTO   final_buildings 
FROM   municipality_cut_layer 
       INNER JOIN buildings 
               ON St_contains(municipality_cut_layer.geom, buildings.geom); 

DROP TABLE IF EXISTS buildings; 

ALTER TABLE final_buildings 
  RENAME TO buildings; 

SELECT burial_areas.*, 
       municipality_cut_layer 
INTO   final_burial_areas 
FROM   municipality_cut_layer 
       INNER JOIN burial_areas 
               ON St_contains(municipality_cut_layer.geom, burial_areas.geom); 

DROP TABLE IF EXISTS burial_areas; 

ALTER TABLE final_burial_areas 
  RENAME TO burial_areas; 

SELECT church_protection_line.*, 
       municipality_cut_layer 
INTO   final_church_protection_line 
FROM   municipality_cut_layer 
       INNER JOIN church_protection_line 
               ON St_contains(municipality_cut_layer.geom, 
                  church_protection_line.geom); 

DROP TABLE IF EXISTS church_protection_line; 

ALTER TABLE final_church_protection_line 
  RENAME TO church_protection_line; 

SELECT coast_line_zone.*, 
       municipality_cut_layer 
INTO   final_coast_line_zone 
FROM   municipality_cut_layer 
       INNER JOIN coast_line_zone 
               ON St_contains(municipality_cut_layer.geom, 
coast_line_zone.geom); 

DROP TABLE IF EXISTS coast_line_zone; 

ALTER TABLE final_coast_line_zone 
  RENAME TO coast_line_zone; 

SELECT conservation.*, 
       municipality_cut_layer 
INTO   final_conservation 
FROM   municipality_cut_layer 
       INNER JOIN conservation 
               ON St_contains(municipality_cut_layer.geom, conservation.geom); 

DROP TABLE IF EXISTS conservation; 

ALTER TABLE final_conservation 
  RENAME TO conservation; 

SELECT district_plan.*, 
       municipality_cut_layer 
INTO   final_district_plan 
FROM   municipality_cut_layer 
       INNER JOIN district_plan 
               ON St_contains(municipality_cut_layer.geom, district_plan.geom); 

DROP TABLE IF EXISTS district_plan; 

ALTER TABLE final_district_plan 
  RENAME TO district_plan; 

SELECT drinking_water_interests.*, 
       municipality_cut_layer 
INTO   final_drinking_water_interests 
FROM   municipality_cut_layer 
       INNER JOIN drinking_water_interests 
               ON St_contains(municipality_cut_layer.geom, 
                  drinking_water_interests.geom); 

DROP TABLE IF EXISTS drinking_water_interests; 

ALTER TABLE final_drinking_water_interests 
  RENAME TO drinking_water_interests; 

SELECT dune_conservation.*, 
       municipality_cut_layer 
INTO   final_dune_conservation 
FROM   municipality_cut_layer 
       INNER JOIN dune_conservation 
               ON St_contains(municipality_cut_layer.geom, 
                  dune_conservation.geom); 

DROP TABLE IF EXISTS dune_conservation; 

ALTER TABLE final_dune_conservation 
  RENAME TO dune_conservation; 

SELECT edge_water_stream.*, 
       municipality_cut_layer 
INTO   final_edge_water_stream 
FROM   municipality_cut_layer 
       INNER JOIN edge_water_stream 
               ON St_contains(municipality_cut_layer.geom, 
                  edge_water_stream.geom); 

DROP TABLE IF EXISTS edge_water_stream; 

ALTER TABLE final_edge_water_stream 
  RENAME TO edge_water_stream; 

SELECT forest.*, 
       municipality_cut_layer 
INTO   final_forest 
FROM   municipality_cut_layer 
       INNER JOIN forest 
               ON St_contains(municipality_cut_layer.geom, forest.geom); 

DROP TABLE IF EXISTS forest; 

ALTER TABLE final_forest 
  RENAME TO forest; 

SELECT buildings.*, 
       municipality_cut_layer 
INTO   final_buildings 
FROM   municipality_cut_layer 
       INNER JOIN buildings 
               ON St_contains(municipality_cut_layer.geom, buildings.geom); 

DROP TABLE IF EXISTS buildings; 

ALTER TABLE final_buildings 
  RENAME TO buildings; 

SELECT buildings.*, 
       municipality_cut_layer 
INTO   final_buildings 
FROM   municipality_cut_layer 
       INNER JOIN buildings 
               ON St_contains(municipality_cut_layer.geom, buildings.geom); 

DROP TABLE IF EXISTS buildings; 

ALTER TABLE final_buildings 
  RENAME TO buildings; 

SELECT buildings.*, 
       municipality_cut_layer 
INTO   final_buildings 
FROM   municipality_cut_layer 
       INNER JOIN buildings 
               ON St_contains(municipality_cut_layer.geom, buildings.geom); 

DROP TABLE IF EXISTS buildings; 

ALTER TABLE final_buildings 
  RENAME TO buildings; 

SELECT buildings.*, 
       municipality_cut_layer 
INTO   final_buildings 
FROM   municipality_cut_layer 
       INNER JOIN buildings 
               ON St_contains(municipality_cut_layer.geom, buildings.geom); 

DROP TABLE IF EXISTS buildings; 

ALTER TABLE final_buildings 
  RENAME TO buildings; 

SELECT buildings.*, 
       municipality_cut_layer 
INTO   final_buildings 
FROM   municipality_cut_layer 
       INNER JOIN buildings 
               ON St_contains(municipality_cut_layer.geom, buildings.geom); 

DROP TABLE IF EXISTS buildings; 

ALTER TABLE final_buildings 
  RENAME TO buildings; 

SELECT buildings.*, 
       municipality_cut_layer 
INTO   final_buildings 
FROM   municipality_cut_layer 
       INNER JOIN buildings 
               ON St_contains(municipality_cut_layer.geom, buildings.geom); 

DROP TABLE IF EXISTS buildings; 

ALTER TABLE final_buildings 
  RENAME TO buildings; 

SELECT buildings.*, 
       municipality_cut_layer 
INTO   final_buildings 
FROM   municipality_cut_layer 
       INNER JOIN buildings 
               ON St_contains(municipality_cut_layer.geom, buildings.geom); 

DROP TABLE IF EXISTS buildings; 

ALTER TABLE final_buildings 
  RENAME TO buildings; 

SELECT buildings.*, 
       municipality_cut_layer 
INTO   final_buildings 
FROM   municipality_cut_layer 
       INNER JOIN buildings 
               ON St_contains(municipality_cut_layer.geom, buildings.geom); 

DROP TABLE IF EXISTS buildings; 

ALTER TABLE final_buildings 
  RENAME TO buildings; 

SELECT buildings.*, 
       municipality_cut_layer 
INTO   final_buildings 
FROM   municipality_cut_layer 
       INNER JOIN buildings 
               ON St_contains(municipality_cut_layer.geom, buildings.geom); 

DROP TABLE IF EXISTS buildings; 

ALTER TABLE final_buildings 
  RENAME TO buildings; 

SELECT buildings.*, 
       municipality_cut_layer 
INTO   final_buildings 
FROM   municipality_cut_layer 
       INNER JOIN buildings 
               ON St_contains(municipality_cut_layer.geom, buildings.geom); 

DROP TABLE IF EXISTS buildings; 

ALTER TABLE final_buildings 
  RENAME TO buildings; 

SELECT buildings.*, 
       municipality_cut_layer 
INTO   final_buildings 
FROM   municipality_cut_layer 
       INNER JOIN buildings 
               ON St_contains(municipality_cut_layer.geom, buildings.geom); 

DROP TABLE IF EXISTS buildings; 

ALTER TABLE final_buildings 
  RENAME TO buildings; 

SELECT buildings.*, 
       municipality_cut_layer 
INTO   final_buildings 
FROM   municipality_cut_layer 
       INNER JOIN buildings 
               ON St_contains(municipality_cut_layer.geom, buildings.geom); 

DROP TABLE IF EXISTS buildings; 

ALTER TABLE final_buildings 
  RENAME TO buildings; 

SELECT buildings.*, 
       municipality_cut_layer 
INTO   final_buildings 
FROM   municipality_cut_layer 
       INNER JOIN buildings 
               ON St_contains(municipality_cut_layer.geom, buildings.geom); 

DROP TABLE IF EXISTS buildings; 

ALTER TABLE final_buildings 
  RENAME TO buildings; 

SELECT buildings.*, 
       municipality_cut_layer 
INTO   final_buildings 
FROM   municipality_cut_layer 
       INNER JOIN buildings 
               ON St_contains(municipality_cut_layer.geom, buildings.geom); 

DROP TABLE IF EXISTS buildings; 

ALTER TABLE final_buildings 
  RENAME TO buildings; 

SELECT buildings.*, 
       municipality_cut_layer 
INTO   final_buildings 
FROM   municipality_cut_layer 
       INNER JOIN buildings 
               ON St_contains(municipality_cut_layer.geom, buildings.geom); 

DROP TABLE IF EXISTS buildings; 

ALTER TABLE final_buildings 
  RENAME TO buildings; 

SELECT buildings.*, 
       municipality_cut_layer 
INTO   final_buildings 
FROM   municipality_cut_layer 
       INNER JOIN buildings 
               ON St_contains(municipality_cut_layer.geom, buildings.geom); 

DROP TABLE IF EXISTS buildings; 

ALTER TABLE final_buildings 
  RENAME TO buildings; 

SELECT buildings.*, 
       municipality_cut_layer 
INTO   final_buildings 
FROM   municipality_cut_layer 
       INNER JOIN buildings 
               ON St_contains(municipality_cut_layer.geom, buildings.geom); 

DROP TABLE IF EXISTS buildings; 

ALTER TABLE final_buildings 
  RENAME TO buildings; 

SELECT buildings.*, 
       municipality_cut_layer 
INTO   final_buildings 
FROM   municipality_cut_layer 
       INNER JOIN buildings 
               ON St_contains(municipality_cut_layer.geom, buildings.geom); 

DROP TABLE IF EXISTS buildings; 

ALTER TABLE final_buildings 
  RENAME TO buildings; 

SELECT buildings.*, 
       municipality_cut_layer 
INTO   final_buildings 
FROM   municipality_cut_layer 
       INNER JOIN buildings 
               ON St_contains(municipality_cut_layer.geom, buildings.geom); 

DROP TABLE IF EXISTS buildings; 

ALTER TABLE final_buildings 
  RENAME TO buildings; 

SELECT buildings.*, 
       municipality_cut_layer 
INTO   final_buildings 
FROM   municipality_cut_layer 
       INNER JOIN buildings 
               ON St_contains(municipality_cut_layer.geom, buildings.geom); 

DROP TABLE IF EXISTS buildings; 

ALTER TABLE final_buildings 
  RENAME TO buildings; 

SELECT buildings.*, 
       municipality_cut_layer 
INTO   final_buildings 
FROM   municipality_cut_layer 
       INNER JOIN buildings 
               ON St_contains(municipality_cut_layer.geom, buildings.geom); 

DROP TABLE IF EXISTS buildings; 

ALTER TABLE final_buildings 
  RENAME TO buildings; 

SELECT buildings.*, 
       municipality_cut_layer 
INTO   final_buildings 
FROM   municipality_cut_layer 
       INNER JOIN buildings 
               ON St_contains(municipality_cut_layer.geom, buildings.geom); 

DROP TABLE IF EXISTS buildings; 

ALTER TABLE final_buildings 
  RENAME TO buildings; 

SELECT buildings.*, 
       municipality_cut_layer 
INTO   final_buildings 
FROM   municipality_cut_layer 
       INNER JOIN buildings 
               ON St_contains(municipality_cut_layer.geom, buildings.geom); 

DROP TABLE IF EXISTS buildings; 

ALTER TABLE final_buildings 
  RENAME TO buildings; 

SELECT buildings.*, 
       municipality_cut_layer 
INTO   final_buildings 
FROM   municipality_cut_layer 
       INNER JOIN buildings 
               ON St_contains(municipality_cut_layer.geom, buildings.geom); 

DROP TABLE IF EXISTS buildings; 

ALTER TABLE final_buildings 
  RENAME TO buildings; 

SELECT buildings.*, 
       municipality_cut_layer 
INTO   final_buildings 
FROM   municipality_cut_layer 
       INNER JOIN buildings 
               ON St_contains(municipality_cut_layer.geom, buildings.geom); 

DROP TABLE IF EXISTS buildings; 

ALTER TABLE final_buildings 
  RENAME TO buildings; 

SELECT buildings.*, 
       municipality_cut_layer 
INTO   final_buildings 
FROM   municipality_cut_layer 
       INNER JOIN buildings 
               ON St_contains(municipality_cut_layer.geom, buildings.geom); 

DROP TABLE IF EXISTS buildings; 

ALTER TABLE final_buildings 
  RENAME TO buildings; 

SELECT buildings.*, 
       municipality_cut_layer 
INTO   final_buildings 
FROM   municipality_cut_layer 
       INNER JOIN buildings 
               ON St_contains(municipality_cut_layer.geom, buildings.geom); ss

DROP TABLE IF EXISTS buildings; 

ALTER TABLE final_buildings 
  RENAME TO buildings; 

SELECT buildings.*, 
       municipality_cut_layer 
INTO   final_buildings 
FROM   municipality_cut_layer 
       INNER JOIN buildings 
               ON St_contains(municipality_cut_layer.geom, buildings.geom); 

DROP TABLE IF EXISTS buildings; 

ALTER TABLE final_buildings 
  RENAME TO buildings; 

SELECT buildings.*, 
       municipality_cut_layer 
INTO   final_buildings 
FROM   municipality_cut_layer 
       INNER JOIN buildings 
               ON St_contains(municipality_cut_layer.geom, buildings.geom); 

DROP TABLE IF EXISTS buildings; 

ALTER TABLE final_buildings 
  RENAME TO buildings; 