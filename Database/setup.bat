@ECHO OFF

SETLOCAL

ECHO Initializing environment
REM overwrite log
CALL:SETTINGS>log.log 2>&1

ECHO Parsing shape files
REM append to log
CALL:PARSE_SHAPE_FILES >>log.log 2>&1

ECHO Fixing *.sql line feed errors
REM append to log
CALL:FIX_SQL_LF >>log.log 2>&1

ECHO Dropping database
REM append to log
CALL:DROP_DB >>log.log 2>&1

ECHO Initializing database
REM append to log
CALL:CREATE_DB >>log.log 2>&1

ECHO Importing data
REM append to log
CALL:IMPORT_DATA >>log.log 2>&1

ECHO Setting-up database
REM append to log
CALL:SETUP_DB >>log.log 2>&1

ECHO Script closing

GOTO:EOF


REM ||                              SET ENVIRONMENT                                   ||
REM ------------------------------------------------------------------------------------
:SETTINGS

REM Only these two should be changed, the rest of the settings should remain intact
SET pguser=postgres
SET pgpassword=postgres


REM Path to where shapefile loader
SET SHP2PGSQL=C:\Program Files\PostgreSQL\9.5\bin\shp2pgsql.exe

REM Path to interactive PSQL terminal
SET PSQL=C:\Program Files\PostgreSQL\9.5\bin\psql.exe

REM Do not alter these. Points to the path for shapefile import folder 
REM and sql file folder where Import_shapefiles.bat is located.
REM Folder path for sql command files

SET SHP_FILE_PATH=%~dp0SHP_FILES
SET TEMP_SQL_FILE_PATH=%~dp0TEMP_SQL_FILES
SET LOG_PATH=%~dp0SQL_LOGS
SET TOOLS_PATH=%~dp0Tools
SET BUILDING_META=%~dp0CSV\byg706.csv

REM Postgresql: server host name, server port number, server username, server password
REM database name and schema, SRID for shape files, name of the geometry column

SET pghost=localhost
SET pgschema=public

REM DB for our project
SET pgdb=nnaat
SET pgport=5432
SET pgsrid=3044
SET pggeom=geom
SET pgencoding="LATIN1"

REM Create directories if not existant
IF NOT EXIST "%TEMP_SQL_FILE_PATH%" MKDIR %TEMP_SQL_FILE_PATH%
IF NOT EXIST "%SHP_FILE_PATH%" MKDIR %SHP_FILE_PATH%


REM Purge generated sql files
FOR %%f in (%TEMP_SQL_FILE_PATH%\*) do del %%f

EXIT /B



REM ||                          PARSE SHAPEFILES INTO SQL                             ||
REM ------------------------------------------------------------------------------------
:PARSE_SHAPE_FILES

REM Use shapefiles to create sql statements using shp2pgsql
FOR %%f in (%SHP_FILE_PATH%\*.shp) do (

ECHO Parsing %%~nxf

"%SHP2PGSQL%" -s %pgsrid% -d -g %pggeom% -D -i -I -W %pgencoding% %%f %pgschema%.%%~nf > %TEMP_SQL_FILE_PATH%\%%~nf.sql
)

EXIT /B



REM ||               FIX LINE FEED MISTAKES IN THE SQL FILES                          ||
REM ------------------------------------------------------------------------------------
REM shp2pgsql incorrecly parses '\n' (unix new line) (when witin a column value)
REM when running on windows:
REM a value like 'Text \n more text' in column X would get translated as:
REM 'Text \\\r\n more text', this needs to be fixed, because it invalidates
REM SQL syntax, or stdout->stdin to psql with COPY()
:FIX_SQL_LF

FOR %%f in (%TEMP_SQL_FILE_PATH%\*.sql) do (

ECHO Fixing %%~nxf

REM C# tool to replace [a] with [b] N^N times faster than the following approach
%TOOLS_PATH%\replacer.exe %%f "\`r`n" " "

REM Spent 4 hours to figure the following, however, with text files over 1GB
REM my machine with 8GB of RAM runs out of memory, apparently .replace
REM is using silly string concatenation, will be rewritten in C#
REM powershell -Command "(Get-Content -Raw %%f).replace(\"\`r`n\", \"\") | Set-Content %%f"
)

EXIT /B



REM ||                               DROP DATABASE                                    ||
REM ------------------------------------------------------------------------------------
:DROP_DB

REM Cleanup previous versions of the database
"%PSQL%" -h %pghost% -p %pgport% -U %pguser% -d postgres -a -f %~dp0cleanup-db.sql -v dbname=%pgdb%

EXIT /B



REM ||                              CREATE DATABASE                                   ||
REM ------------------------------------------------------------------------------------
:CREATE_DB

REM create database
"%PSQL%" -h %pghost% -p %pgport% -U %pguser% -d postgres -a -f %~dp0create-db.sql -v dbname=%pgdb% -v dbowner=%pguser% -v building_meta_file=%BUILDING_META%

EXIT /B



REM ||                               IMPORT DATA                                      ||
REM ------------------------------------------------------------------------------------
:IMPORT_DATA

REM Execute generated SQL files, log output to import.log
FOR %%f in (%TEMP_SQL_FILE_PATH%\*.sql) do "%PSQL%" -h %pghost% -p %pgport% -d %pgdb% -U %pguser% -L import.log -f %%f

EXIT /B



REM ||                               SETUP DATABASE                                   ||
REM ------------------------------------------------------------------------------------
:SETUP_DB

REM setup database
"%PSQL%" -h %pghost% -p %pgport% -U %pguser% -d %pgdb% -a -f %~dp0setup-db.sql

EXIT /B


ENDLOCAL
