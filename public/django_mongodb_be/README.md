# Pre-requisites
 [Python](https://www.python.org/downloads/)
 
 [Django](https://www.djangoproject.com/download/)
 
 [Django Rest Framework](https://www.django-rest-framework.org/#installation)
 
 [MongoDB](https://www.mongodb.com/compatibility/mongodb-and-django)
 ```python
 pip install django
 pip install djangorestframework
 pip install django-cors-headers
 pip install djongo(in this project)
 ```
 
 ## Db Configuration
 Post db configuration, configure connection parameters.
 So open settings.py and change declaration of DATABASES:
  ```python
  DATABASES = {
    'default': {
        'ENGINE': 'djongo',
        'NAME': 'dbname,
        'HOST': '127.0.0.1',
        'PORT': 27017,
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
    
   
