CREATE DATABASE :dbname
	WITH
		LC_COLLATE = 'C'
		LC_CTYPE = 'C'
		OWNER = :dbowner
		ENCODING = 'UTF8'
		TEMPLATE = template0;

-- Switch to the newly created DB
\connect :dbname
	   
CREATE EXTENSION postgis;

-- Building metadata table to host data from csv
CREATE TABLE BUILDING_META
(
	OIS_ID INTEGER,
	BYG_ANVEND INTEGER,
	KOORNORD FLOAT,
	KOOROEST FLOAT,
	GEOM GEOMETRY
);

-- Create the command dynamically
\set CMD '\\COPY BUILDING_META(OIS_ID, BYG_ANVEND, KOORNORD, KOOROEST) FROM ''':building_meta_file''' WITH DELIMITER '','' CSV HEADER;'
:CMD

UPDATE BUILDING_META SET GEOM = ST_SETSRID(ST_MAKEPOINT(KOOROEST, KOORNORD), 3044);