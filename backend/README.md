# TechMarketAPI
    * There should be a description here :)

## Setup project
___<span style="color:purple">!!! Start this project from one console !!!</span>___
* __1. Go to the backend directory__
  ```
  cd backend/
  ```

* __2. Need to create a venv to safely install python dependencies__
  ```
  python -m venv .venv
  ```

* __3. Now you need to activate it__
  ```
  .venv\Scripts\activate
  ```

* __4. Download required dependencies__
  ```
  pip install -r requirements.txt --no-cache
  ```

* __5. Need to apply migrations to the database__
  ```
  python manage.py migrate
  ```

* __6. Create a superuser, and follow the instructions after executing the command__
  ```
  python manage.py createsuperuser
  ```

* __7. Insert test data into the database__
  ```
  python manage.py loaddata test_dump.json
  ```

* __8. Run development server__
  ```
  python manage.py runserver
  ```

___<span style="color:purple">First, log in with the created superuser (at ~user/login/)(the session key will be in cookies) and then you will be able to create elements</span>___
***
### <span style="color:yellow">If there is a .venv folder in the backend/ folder, use steps (1, 3, 8)</span>
***
### <span style="color:orange">If changes have been made to the database, use steps (1, 5, 7, 8)</span>
***
### <span style="color:red">If the database has been erased, follow steps (1, 5, 6, 7, 8)</span>
