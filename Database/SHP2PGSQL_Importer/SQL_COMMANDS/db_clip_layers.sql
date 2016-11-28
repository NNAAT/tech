select beach_protection.*, municipality_cut_layer into final_beach_protection from municipality_cut_layer INNER JOIN beach_protection on st_contains(municipality_cut_layer.geom, beach_protection.geom);
DROP TABLE IF EXISTS beach_protection;
ALTER TABLE final_beach_protection RENAME TO beach_protection;
select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;
select burial_areas.*, municipality_cut_layer into final_burial_areas from municipality_cut_layer INNER JOIN burial_areas on st_contains(municipality_cut_layer.geom, burial_areas.geom);
DROP TABLE IF EXISTS burial_areas;
ALTER TABLE final_burial_areas RENAME TO burial_areas;
select church_protection_line.*, municipality_cut_layer into final_church_protection_line from municipality_cut_layer INNER JOIN church_protection_line on st_contains(municipality_cut_layer.geom, church_protection_line.geom);
DROP TABLE IF EXISTS church_protection_line;
ALTER TABLE final_church_protection_line RENAME TO church_protection_line;
select coast_line_zone.*, municipality_cut_layer into final_coast_line_zone from municipality_cut_layer INNER JOIN coast_line_zone on st_contains(municipality_cut_layer.geom, coast_line_zone.geom);
DROP TABLE IF EXISTS coast_line_zone;
ALTER TABLE final_coast_line_zone RENAME TO coast_line_zone;
select conservation.*, municipality_cut_layer into final_conservation from municipality_cut_layer INNER JOIN conservation on st_contains(municipality_cut_layer.geom, conservation.geom);
DROP TABLE IF EXISTS conservation;
ALTER TABLE final_conservation RENAME TO conservation;
select district_plan.*, municipality_cut_layer into final_district_plan from municipality_cut_layer INNER JOIN district_plan on st_contains(municipality_cut_layer.geom, district_plan.geom);
DROP TABLE IF EXISTS district_plan;
ALTER TABLE final_district_plan RENAME TO district_plan;
select drinking_water_interests.*, municipality_cut_layer into final_drinking_water_interests from municipality_cut_layer INNER JOIN drinking_water_interests on st_contains(municipality_cut_layer.geom, drinking_water_interests.geom);
DROP TABLE IF EXISTS drinking_water_interests;
ALTER TABLE final_drinking_water_interests RENAME TO drinking_water_interests;
select dune_conservation.*, municipality_cut_layer into final_dune_conservation from municipality_cut_layer INNER JOIN dune_conservation on st_contains(municipality_cut_layer.geom, dune_conservation.geom);
DROP TABLE IF EXISTS dune_conservation;
ALTER TABLE final_dune_conservation RENAME TO dune_conservation;

select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;

select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;

select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;

select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;

select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;

select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;

select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;

select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;

select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;

select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;

select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;

select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;

select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;

select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;

select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;

select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;

select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;

select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;

select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;

select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;

select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;

select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;

select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;

select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;

select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;

select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;

select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;

select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;

select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;

select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;

select buildings.*, municipality_cut_layer into final_buildings from municipality_cut_layer INNER JOIN buildings on st_contains(municipality_cut_layer.geom, buildings.geom);
DROP TABLE IF EXISTS buildings;
ALTER TABLE final_buildings RENAME TO buildings;