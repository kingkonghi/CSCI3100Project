import mariadb
import sys
from .config import DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME

def connect():
    try:
        conn = mariadb.connect(
            user = DB_USER,
            password = DB_PASSWORD,
            host = DB_HOST,
            port = DB_PORT,
            database = DB_NAME
        )
        return conn
    except mariadb.Error as e:
        print(f"Error connecting to MariaDB Platform:{e}")
        sys.exit(1)
