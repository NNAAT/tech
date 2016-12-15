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

UPDATE BUILDING_META
    SET GEOM = ST_SETSRID(ST_MAKEPOINT(KOOROEST, KOORNORD), 3044);

-- Create configuration table
CREATE TABLE CONFIGURATION
(
    C_ID SMALLINT,
    HUB_HEIGHT SMALLINT,
    ROTOR_DIAMETER SMALLINT,
    RESTRICTIVE_MULTIPLIER NUMERIC(4, 3),
    UNRECEPTIVE_MULTIPLIER NUMERIC(4, 3),
    LIMITING_MULTIPLIER NUMERIC(4, 3),
    ADVANTAGEOUS_MULTIPLIER NUMERIC(4, 3),
    CONSTRAINT "CONFIGURATION_PK" PRIMARY KEY (C_ID)
);

-- Standard turbine model - Vestas 47-660 KW:
INSERT INTO CONFIGURATION
    VALUES (1, 55, 47, 0.555, 0.667, 0.888, 1);
    
CREATE VIEW V_CONFIG
AS
(
    SELECT  C_ID,
            HUB_HEIGHT,
            ROTOR_DIAMETER,
            ROTOR_DIAMETER / 2 AS BLADE_LENGTH,
            (HUB_HEIGHT + ROTOR_DIAMETER / 2) AS WT_HEIGHT,
            RESTRICTIVE_MULTIPLIER,
            UNRECEPTIVE_MULTIPLIER,
            LIMITING_MULTIPLIER,
            ADVANTAGEOUS_MULTIPLIER
    FROM CONFIGURATION
    WHERE C_ID = 1
);