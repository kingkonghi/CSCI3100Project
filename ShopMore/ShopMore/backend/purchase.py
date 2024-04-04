import mariadb
import sys
from database.connection import *
from models.cart import *
from models.item import *
from models.order import *
conn = connect()

cur = conn.cursor()