from database.connection import connect
from models.user import User
import sys


def test():
    try:
        conn = connect()
        if conn:
            print("Database connection established successfully.")
        else:
            print("Failed to established database connection.")
    except Exception as e:
        print("Error:", e)
        sys.exit(1)
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT * FROM user")
        rows = cursor.fetchall()
    except Exception as e:
        print(e)
        sys.exit(1)
    users = []
    for row in rows:
        user_data = {
        "UID": row[0],
        "ACCOUNTTYPE": row[1],
        "UNAME": row[2],
        "UPASSWORD": row[3],
        "EMAILL": row[4],
        "PROFILEPHOT": row[5],
        "ADDRESS": row[6]
        }
        user = User(**user_data)
        users.append(user)
    conn.close()

    for user in users:
        print(user)
        
if __name__ == "__main__":
    test()