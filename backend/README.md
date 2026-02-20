# TechMarketAPI
    * There should be a description here :)

## Setup project
___!!! Start this project from one console !!!___
* __Go to the backend directory__
  ```
  cd backend/
  ```

* __Need to create a venv to safely install python dependencies__
  ```
  python -m venv .venv
  ```

* __Now you need to activate it__
  ```
  .venv\Scripts\activate
  ```

* __Download required dependencies__
  ```
  pip install -r requirements.txt --no-cache
  ```

* __Need to apply migrations to the database__
  ```
  python manage.py migrate
  ```

* __Insert test data into the database__
  ```
  python manage.py loaddata test_dump.json
  ```

* __Create a superuser, and follow the instructions after executing the command__
  ```
  python manage.py createsuperuser
  ```

* __Run development server__
  ```
  python manage.py runserver
  ```

___First, log in with the created superuser (at ~user/login/)(the session key will be in cookies) and then you will be able to create elements___
