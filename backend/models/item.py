class Item:
    def __init__(self, ITERID, ITEMNAME, ITEMDESC, ITEMCATEGORY, ITEMIMAGE, ITEMPRICE, ITEMQUANTITY, ITEMSTATUS):
        self.ITERID = ITERID
        self.ITEMNAME = ITEMNAME
        self.ITEMDESC = ITEMDESC
        self.ITEMCATEGORY = ITEMCATEGORY
        self.ITEMIMAGE = ITEMIMAGE
        self.ITEMPRICE = ITEMPRICE
        self.ITEMQUANTITY = ITEMQUANTITY
        self.ITEMSTATUS = ITEMSTATUS
        
        

    def __repr__(self):
        return f"Item(ITERID={self.ITERID}, ITEMNAME={self.ITEMNAME}, ITEMDESC={self.ITEMDESC}, ITEMCATEGORY={self.ITEMCATEGORY}, ITEMIMAGE={self.ITEMIMAGE}, ITEMPRICE={self.ITEMPRICE}, ITEMQUANTITY={self.ITEMQUANTITY}, ITEMSTATUS={self.ITEMSTATUS})"
