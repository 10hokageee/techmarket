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
  pip install -r requirements.txt
  ```

* __Need to apply migrations to the database__
  ```
  python manage.py migrate
  ```

* __Insert test data into the database__
  ```
  python manage.py loaddata test_dump.json
  ```

* __Run development server__
  ```
  python manage.py runserver
  ```
