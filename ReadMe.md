1. Install the following python library:
- djangorestframework
- django
- django-cors-headers
- pymysql
- mariadb
- paypalrestsdk

2. Running server:
- navigate to /ShopMore
- add the following to __init__.py:
    import pymysql
    pymysql.install_as_MySQLdb()
- input the following: python manage.py runserver

3. Run client:
- navigate to /ShopMore/ShopMore/frontend
- input the following: npm install
- input the following: npm start

4. Enjoy the online shopping mall!