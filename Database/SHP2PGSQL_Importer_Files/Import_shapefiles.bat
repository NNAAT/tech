
REM Path to where shp2pgsql.exe is located!
SET SHP2PGSQL_PATH=C:\Program Files\PostgreSQL\9.5\bin\shp2pgsql.exe

REM Path to where psql.exe is located!
SET PSQL_PATH=C:\Program Files\PostgreSQL\9.5\bin\psql.exe

REM Do not alter these. Points to the path for shapefile import folder 
REM and sql file folder where Import_shapefiles.bat is located.
SET SHP_PATH=%~dp0\SHP_Import_Files
SET SQL_PATH=%~dp0\SQL_FILES

REM Postgresql: Host name!
SET pghost=localhost

REM Postgresql: The User name!
SET pguser=postgres

REM Postgresql: The password!
SET PGPASSWORD=postgress

REM Postgresql: The schema name in the database!
SET pgschema=public

REM Postgresql: Database name! 
SET pgdb=Project-test

REM Postgresql: Port number!
SET pgport=5432



REM Postgresql: The srid number for .shp files!
SET pgsrid=25832

REM Postgresql: Name for geometry column!
SET pggeom=geom

REM Postgresql: The character encoding for the shape's attribute columns!
SET pgencoding="LATIN1"

REM "Scan shapefile and create the SQL file"
for %%f in (%SHP_PATH%\*.shp) do "%SHP2PGSQL_PATH%" -s %pgsrid% -d -g %pggeom% -D -i -I -W %pgencoding% %%f %pgschema%.%%~nf > %SQL_PATH%\%%~nf.sql

REM "Scan the SQL file and load them in the DB Postgres"
for %%f in (%SQL_PATH%\*.sql) do "%PSQL_PATH%" -h %pghost% -p %pgport% -d %pgdb% -U %pguser% -L %%~nxf.log -f %%f

REM "Scan the SQL files and remove all them (to return to the original configuration in the file-system"
for %%f in (%SQL_PATH%\*.sql) do del %%f

