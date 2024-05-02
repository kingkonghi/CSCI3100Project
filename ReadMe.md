# ShopMore
ShopMore is a full-stack online shopping system that provides shopping experience for customers and efficient management tools for administrators. ShopMore utilizes React in frontend and Django in backend.

# Installation
**1. Install the following Python library:**
- djangorestframework
- django
- django-cors-headers
- pymysql
- mariadb
- paypalrestsdk

**2. Running server:**
- navigate to
  `/ShopMore`
- add the following to `__init__.py`:
```
import pymysql
pymysql.install_as_MySQLdb()
```
- input the following:
```
 python manage.py runserver
```

3. Run client:
- navigate to `/ShopMore/ShopMore/frontend`
- input the following:
```
npm install
npm start
```

4. Enjoy the online shopping mall!
