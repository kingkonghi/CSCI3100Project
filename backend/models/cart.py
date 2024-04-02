class cart:
    def __init__(self, userid, itemid, quantity):
        self.userid = userid
        self.itemid = itemid
        self.quantity = quantity
        
    def __repr__(self):
        return f"cart(userid={self.userid}, itemid={self.itemid}, quantity={self.quantity})"