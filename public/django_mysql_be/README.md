# Pre-requisites
 [Python](https://www.python.org/downloads/)
 
 [Django](https://www.djangoproject.com/download/)
 
 [Django Rest Framework](https://www.django-rest-framework.org/#installation)
 
 [PyMySQL](https://pypi.org/project/PyMySQL/#installation)
 ```python
 pip install django
 pip install djangorestframework
 pip install django-cors-headers
 pip install pymysql
 ```
 ## Db Configuration
 Post db configuration, configure connection parameters.
 So open settings.py and change declaration of DATABASES:
  ```python
  DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'testdb',
        'USER': 'root',
        'PASSWORD': '123456',
        'HOST': '127.0.0.1',
        'PORT': '3306',
      }
   }
   ```
   # Getting started with django
   Migrate to the root folder, perform the above steps.
   Then to migrate Data Model to database, run the Python script: 
   ```python
   python manage.py makemigrations tutorials
   python manage.py migrate tutorials
   ```
   ## Starts the server
   ```python   
   python manage.py runserver 
   ```
    
   
