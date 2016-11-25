-- WIND FARM BUFFER

-- All wind turbines gets a 300 metres buffer with ST_Buffer
-- The buffers are merged into a multipolygon with ST_Union 
-- The multipolygons are seperated by then separate into single parts with ST_Dump and .geom

CREATE TABLE clusterpolys AS
SELECT (ST_Dump(ST_Union(ST_Buffer(geom, 300)))).geom FROM wind_turbines;

-- Add a unique cluster ID to the cluster polygons
ALTER TABLE clusterpolys ADD COLUMN cluster_id serial;

-- Create a cluster ID column for wind_turbines and 
ALTER TABLE wind_turbines ADD COLUMN cluster_id integer;

-- Transfer the cluster ID to the points
update wind_turbines WT
set cluster_id = CP.cluster_id
from  clusterpolys CP
where st_intersects(WT.geom, CP.geom);

-- Clusters with more than 3 wind turbines (wind farms) are stored in a new table "wind_clusters"
SELECT cluster_id, count(*)
INTO wind_clusters
FROM wind_turbines
GROUP BY cluster_id
HAVING count(*) > 3
ORDER BY count(*) DESC 

-- Joins the cluster table on the wind turbines table to select all of the wind turbines that are a part of a wind farm
SELECT gid, geom, WC.cluster_id
INTO wind_farm_turbines
FROM wind_turbines as WT
JOIN wind_clusters as WC ON WT.cluster_id = WC.cluster_id

-- Creating buffers 28 time the height of wind turbines (Model - Vestas 47-660 KW) in wind farms
SELECT (st_Dump(ST_Union(ST_Buffer(geom, 102*28)))).geom
INTO wind_farm_buffer
FROM wind_farm_turbines


-- STATE ROAD BUFFER

SELECT ST_Buffer(state_roads.geom, 250)
INTO state_roads_buffer
FROM state_roads;


-- MUNICIPALITY ROAD BUFFER

SELECT ST_Buffer(MR.geom, 250)
INTO municipality_roads_buffer
FROM municipality_roads as MR
WHERE MR.vejstatus = 'Offentlig';


-- RAILROAD BUFFER

SELECT ST_Buffer(railroad.geom, 250)
INTO railroad_buffer
FROM railroad;