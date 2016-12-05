-- Disable connections
UPDATE pg_database
SET DATALLOWCONN = FALSE
	WHERE DATNAME = :'dbname';

-- Force disconnection
SELECT PG_TERMINATE_BACKEND(PID)
FROM PG_STAT_ACTIVITY
	WHERE DATNAME = :'dbname';

-- Drop database if it exists
DROP DATABASE
	IF EXISTS :dbname;
