
class User:
    def __init__(self, UID, ACCOUNTTYPE, UNAME, UPASSWORD, EMAILL, PROFILEPHOT, ADDRESS):
        self.UID = UID
        self.ACCOUNTTYPE = ACCOUNTTYPE
        self.UNAME = UNAME
        self.UPASSWORD = UPASSWORD
        self.EMAILL = EMAILL
        self.PROFILEPHOT = PROFILEPHOT
        self.ADDRESS = ADDRESS

    def __repr__(self):
        return f"User(UID={self.UID}, ACCOUNTTYPE={self.ACCOUNTTYPE}, UNAME={self.UNAME}, UPASSWORD={self.UPASSWORD}, EMAILL={self.EMAILL}, PROFILEPHOT={self.PROFILEPHOT}, ADDRESS={self.ADDRESS})"
