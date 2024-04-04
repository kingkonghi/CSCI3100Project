import mariadb
import sys
from database.connection import *

conn = connect()

cur = conn.cursor()
