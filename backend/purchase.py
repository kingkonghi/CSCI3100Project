import mariadb
import sys

try:
    conn = mariadb.connect(
        user="root",
        password="csci3100",
        host="localhost",
        database="ShopMore"
        )
except mariadb.Error as e:
    print(f"Error connecting to MariaDB Platform: {e}")
    sys.exit(1)
    
cur = conn.cursor()

price = document.getElementById("price").value