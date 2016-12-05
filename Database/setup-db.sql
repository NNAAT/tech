-- Update SR_ID
SELECT UpdateGeometrySRID('beach_protection','geom',3044);
SELECT UpdateGeometrySRID('buildings','geom',3044);
SELECT UpdateGeometrySRID('burial_areas','geom',3044);
SELECT UpdateGeometrySRID('coast_line_zone','geom',3044);
SELECT UpdateGeometrySRID('coast_line_zone','geom',3044);
SELECT UpdateGeometrySRID('conservation','geom',3044);
SELECT UpdateGeometrySRID('district_plan','geom',3044);
SELECT UpdateGeometrySRID('drinking_water_interests','geom',3044);
SELECT UpdateGeometrySRID('dune_conservation','geom',3044);
SELECT UpdateGeometrySRID('edge_water_stream','geom',3044);
SELECT UpdateGeometrySRID('forest','geom',3044);
SELECT UpdateGeometrySRID('forest_protection_line','geom',3044);
SELECT UpdateGeometrySRID('forest_reserve','geom',3044);
SELECT UpdateGeometrySRID('hexgrid_150','geom',3044);
SELECT UpdateGeometrySRID('lake_protection_line','geom',3044);
SELECT UpdateGeometrySRID('lakes','geom',3044);
SELECT UpdateGeometrySRID('lowlands','geom',3044);
SELECT UpdateGeometrySRID('municipal_plan','geom',3044);
SELECT UpdateGeometrySRID('municipality_cut_layer','geom',3044);
SELECT UpdateGeometrySRID('natura2000_bird_protection','geom',3044);
SELECT UpdateGeometrySRID('natura2000_habitat','geom',3044);
SELECT UpdateGeometrySRID('nature_and_wildlife_sanctuary','geom',3044);
SELECT UpdateGeometrySRID('nature_registration','geom',3044);
SELECT UpdateGeometrySRID('protected_ancient_sites','geom',3044);
SELECT UpdateGeometrySRID('protected_nature_types','geom',3044);
SELECT UpdateGeometrySRID('protected_stone_and_earth_dikes','geom',3044);
SELECT UpdateGeometrySRID('protected_water_streams','geom',3044);
SELECT UpdateGeometrySRID('railroad','geom',3044);
SELECT UpdateGeometrySRID('ramsar_area','geom',3044);
SELECT UpdateGeometrySRID('raw_material_sites','geom',3044);
SELECT UpdateGeometrySRID('roadsides','geom',3044);
SELECT UpdateGeometrySRID('sfl_areas','geom',3044);
SELECT UpdateGeometrySRID('stream_protection_line','geom',3044);
SELECT UpdateGeometrySRID('technical_areas','geom',3044);
SELECT UpdateGeometrySRID('v1_soil_polution','geom',3044);
SELECT UpdateGeometrySRID('v2_soil_polution','geom',3044);
SELECT UpdateGeometrySRID('wetlands','geom',3044);
SELECT UpdateGeometrySRID('wind_resource_layer','geom',3044);
SELECT UpdateGeometrySRID('wind_turbines','geom',3044);
SELECT UpdateGeometrySRID('zones_in_denmark','geom',3044);

-- Standard turbine model - Vestas 47-660 KW:

--------------------------------------------------------------------
--|                       CREATING BUFFERS                       |--
--------------------------------------------------------------------

-- WIND TURBINE BUFFERING
-------------------------------------------------------------------

-- Max hub height - 55 meters, rotor diameter 47
-- Buffer the wind turbines with 4 times the blade length 47/2*4
CREATE MATERIALIZED VIEW MV_WIND_TURBINE_BUFFER
AS
(
	SELECT  ROW_NUMBER() OVER ()::INT WTB_ID,
			IQ.GEOM
	FROM	(SELECT (ST_DUMP(ST_UNION(ST_BUFFER(GEOM, (47 / 2) * 4)))).GEOM
			FROM WIND_TURBINES
		) AS IQ
	-- IQ = Inner Query
)
WITH DATA;

-- Index MV_WIND_TURBINE_BUFFER
CREATE INDEX MV_GIX_WIND_TUBRINE_BUFFER
ON MV_WIND_TURBINE_BUFFER
USING GIST (GEOM);

-- Distinguish buffers with more than 3 wind turbines in them
-- define that as a wind site
CREATE VIEW V_WIND_TURBINE_SITES
AS
(
	SELECT MV_WTB.WTB_ID, MV_WTB.GEOM, COUNT(WT.GID) WT_CNT
	FROM  MV_WIND_TURBINE_BUFFER MV_WTB
		CROSS JOIN WIND_TURBINES WT
	WHERE ST_INTERSECTS(WT.GEOM, MV_WTB.GEOM)
	GROUP BY WTB_ID, MV_WTB.GEOM
		HAVING COUNT(WT.GID) > 3
	ORDER BY WT_CNT DESC
);

-- TODO: change intersection to a INSIDE b
-- Buffer the wind turbine sites with buffer size 28 times the heigth of turbine
CREATE MATERIALIZED VIEW MV_WIND_TURBINE_SITE_BUFFER
AS
(
	SELECT  ROW_NUMBER() OVER ()::INT WTSB_ID,
		IQ.GEOM
	FROM	(SELECT (ST_DUMP(ST_UNION(ST_BUFFER(WT.GEOM, (55 + 47 / 2) * 28)))).GEOM
			FROM 	WIND_TURBINES WT
				JOIN V_WIND_TURBINE_SITES V_WTS
					ON ST_INTERSECTS(WT.GEOM, V_WTS.GEOM)
		) AS IQ
	-- IQ = Inner Query
)
WITH DATA;

-- Index MV_WIND_TURBINE_SITE_BUFFER
CREATE INDEX MV_GIX_WIND_TUBRINE_SITE_BUFFER
ON MV_WIND_TURBINE_SITE_BUFFER
USING GIST (GEOM);

--TODO: Do something here, returns over 150k results
-- from two tables of 900 and 90 rows, should be
-- a simple union
CREATE MATERIALIZED VIEW MV_WIND_TURBINE_FINAL_BUFFER
AS
(
	SELECT ROW_NUMBER() OVER ()::INT WTFB_ID,
			(ST_DUMP(ST_UNION(WTB.GEOM, WTSB.GEOM))).GEOM
	FROM MV_WIND_TURBINE_BUFFER WTB, MV_WIND_TURBINE_SITE_BUFFER WTSB
)
WITH DATA;

CREATE INDEX MV_GIX_WIND_TURBINE_FINAL_BUFFER
ON MV_WIND_TURBINE_FINAL_BUFFER
USING GIST (GEOM);


-- STATE ROAD BUFFERING
-------------------------------------------------------------------
CREATE MATERIALIZED VIEW MV_STATE_ROAD_BUFFER
AS
(
	SELECT  ROW_NUMBER() OVER ()::INT SRB_ID,
		ST_Buffer(STATE_ROADS.GEOM, 250) GEOM
	FROM STATE_ROADS
)
WITH DATA;

-- Index MV_STATE_ROAD_BUFFER
CREATE INDEX MV_GIX_STATE_ROAD_BUFFER
ON MV_STATE_ROAD_BUFFER
USING GIST (GEOM);


-- MUNICIPALITY ROAD BUFFERING
-------------------------------------------------------------------
CREATE MATERIALIZED VIEW MV_MUNICIPALITY_ROAD_BUFFER
AS
(
	SELECT  ROW_NUMBER() OVER ()::INT AS MRB_ID,
		ST_BUFFER(GEOM, 250) GEOM
	FROM MUNICIPALITY_ROADS
	WHERE VEJSTATUS = 'Offentlig'
)
WITH DATA;

CREATE INDEX MV_GIX_MUNICIPALITY_ROAD_BUFFER
ON MV_MUNICIPALITY_ROAD_BUFFER
USING GIST (GEOM);

-- FINAL ROAD BUFFERING
-------------------------------------------------------------------
--TODO: recreate with materialized view
-- merge and dump buffer zones, endless SQL run, tested with 20mins
CREATE VIEW MV_ROAD_FINAL_BUFFER
AS
(
	SELECT 	ROW_NUMBER() OVER ()::INT AS RFB_ID,
		IQ.GEOM
		FROM
		(SELECT GEOM
			FROM MV_STATE_ROAD_BUFFER
		 UNION ALL
		 SELECT GEOM
			FROM MV_MUNICIPALITY_ROAD_BUFFER
		) AS IQ
		-- IQ = Inner Query
);

-- FINAL RAILROAD BUFFERING
-------------------------------------------------------------------
CREATE MATERIALIZED VIEW MV_RAILROAD_FINAL_BUFFER
AS
(
	SELECT  ROW_NUMBER() OVER ()::INT AS RFB_ID,
		ST_BUFFER(RAILROAD.GEOM, 250)

	FROM RAILROAD
)
WITH DATA;

-- RESIDENTIAL AREA BUFFERING
-------------------------------------------------------------------
CREATE MATERIALIZED VIEW MV_BUILDINGS_FINAL_BUFFER
AS
(
	SELECT  ROW_NUMBER() OVER ()::INT AS BFB_ID,
		(ST_DUMP(ST_UNION(ST_BUFFER(B.GEOM, (55 + 47 / 2) * 4)))).GEOM
	FROM BUILDINGS B
	INNER JOIN BUILDING_META BM
		ON ST_INTERSECTS(B.GEOM, BM.GEOM)
			AND BM.BYG_ANVEND IN (110, 120, 130, 140, 150, 160, 190, 510, 520, 530, 540, 550)
	-- CODES FOR BUILDING USE
	-- SOURCE: HTTP://BBR.DK/BYG-ANVENDELSE/0/30 
)
WITH DATA;

CREATE INDEX MV_GIX_BUILDINGS_FINAL_BUFFER
ON MV_BUILDINGS_FINAL_BUFFER
USING GIST (GEOM);

--------------------------------------------------------------------
--|               CALCULATING GRID RATIO VALUES                  |--
--------------------------------------------------------------------

-- Finding beach protection ratio values
ALTER TABLE HEXGRID_150
ADD COLUMN BEACH_PROTECTION_RATIO
NUMERIC NOT NULL DEFAULT 0;

UPDATE HEXGRID_150
	SET BEACH_PROTECTION_RATIO = IQ.PRCNT
	FROM	(SELECT 	HG.OBJECTID ID,
			1 - ROUND(CAST(FLOAT8(ST_AREA(ST_UNION(ST_INTERSECTION(BP.GEOM, HG.GEOM))) / HG.SHAPE_AREA) AS NUMERIC), 6) PRCNT
		FROM 	HEXGRID_150 HG,
			BEACH_PROTECTION BP
		WHERE ST_INTERSECTS(HG.GEOM, BP.GEOM)
			GROUP BY HG.OBJECTID, HG.SHAPE_AREA) AS IQ
WHERE HEXGRID_150.OBJECTID = IQ.ID;

-- Finding building buffer ratio values
--TODO: change for MV_BUILDINGS_FINAL_BUFFER - crazy slow performance
ALTER TABLE HEXGRID_150
ADD COLUMN BUILDING_RATIO
NUMERIC NOT NULL DEFAULT 0;

UPDATE HEXGRID_150
	SET BUILDING_RATIO = IQ.PRCNT
	FROM (	SELECT HG.OBJECTID ID,
		1 - ROUND(CAST(FLOAT8(ST_AREA(ST_UNION(ST_INTERSECTION(B.GEOM, HG.GEOM))) / HG.SHAPE_AREA) AS NUMERIC), 6) PRCNT
		FROM 	BUILDINGS B
				JOIN HEXGRID_150 HG
					ON ST_INTERSECTS(HG.GEOM, B.GEOM)
		GROUP BY HG.OBJECTID, HG.SHAPE_AREA) AS IQ
WHERE HEXGRID_150.GID = IQ.ID;
