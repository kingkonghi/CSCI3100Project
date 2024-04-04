import mariadb
import sys
from .database.connection import mariadb_connection

conn = mariadb_connection.connect()

price = document.getElementById("price").value