REM ----PATH-FILES----------------------------------------------------------------------

REM Path to where shp2pgsql.exe is located!
SET SHP2PGSQL_PATH=C:\Program Files\PostgreSQL\9.5\bin\shp2pgsql.exe

REM Path to where psql.exe is located!
SET PSQL_PATH=C:\Program Files\PostgreSQL\9.5\bin\psql.exe

REM Do not alter these. Points to the path for shapefile import folder 
REM and sql file folder where Import_shapefiles.bat is located.
SET SHP_PATH=%~dp0\SHP_IMPORT_FILES
SET SQL_PATH=%~dp0\TEMP_SQL_FILES
SET LOG_PATH=%~dp0

REM Folder path for sql command files
SET SQLCMD=%~dp0\SQL_COMMANDS

REM ----SERVER-INFORMATION--------------------------------------------------------------

REM Postgresql: Host name!
SET pghost=localhost

REM Postgresql: The User name!
SET pguser=postgres

REM Postgresql: The password!
SET PGPASSWORD=postgres

REM Postgresql: The schema name in the database!
SET pgschema=public

REM Postgresql: Database name! 
SET TASKDB=taskforce

REM Postgresql: Port number!
SET pgport=5432

REM Postgresql: The srid number for .shp files!
SET pgsrid=3044

REM Postgresql: Name for geometry column!
SET pggeom=geom

REM Postgresql: The character encoding for the shape's attribute columns!
SET pgencoding="LATIN1"

REM ------CREATE-TASKFORCE-DATABASE-----------------------------------------------------

REM Deleting temp_project database if it exists
"%PSQL_PATH%" -h %pghost% -p %pgport% -U %pguser% -L %%~nxf.log -f %SQLCMD%\db_drop_final_database.sql

REM Create TaskForce database
"%PSQL_PATH%" -h %pghost% -p %pgport% -U %pguser% -L %%~nxf.log -f %SQLCMD%\db_create_final_database.sql

REM Create postgis extension on temp database
"%PSQL_PATH%" -h %pghost% -p %pgport% -d %TASKDB% -U %pguser% -L %%~nxf.log -f %SQLCMD%\db_postgis_extension.sql

REM ------IMPORT-SHAPEFILES-INTO-TEMP-DATABASE--------------------------------------------

REM "Scan shapefiles and create the SQL files"
for %%f in (%SHP_PATH%\*.shp) do "%SHP2PGSQL_PATH%" -s %pgsrid% -d -g %pggeom% -D -i -I -W %pgencoding% %%f %pgschema%.%%~nf > %SQL_PATH%\%%~nf.sql

REM "Scan the SQL file and load them in the DB Postgres"
for %%f in (%SQL_PATH%\*.sql) do "%PSQL_PATH%" -h %pghost% -p %pgport% -d %TASKDB% -U %pguser% -L %%~nxf.log -f %%f

REM -----UPDATE-SRID----------------------------------------------------------
"%PSQL_PATH%" -h %pghost% -p %pgport% -U %pguser% -L %%~nxf.log -f %SQLCMD%\db_update_srid.sql

REM -----CLIPPING-ALL-LAYERS-TO-MUNICIPALITY----------------------------------------------

REM "%PSQL_PATH%" -h %pghost% -p %pgport% -d %TEMPDB% -U %pguser% -L %%~nxf.log -f %SQLCMD%\db_clip_layers.sql



REM "Scan the SQL and log files and remove all them (to return to the original configuration in the file-system"
for %%f in (%SQL_PATH%\*.sql) do del %%f
for %%f in (%LOG_PATH%\*.log) do del %%f