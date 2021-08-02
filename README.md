# Netflix clone

** MERN STACK APP**

#### Summary

A fully functional netfix clone. Front end designed using ReactJS(Context).Backend is powered by express server and mongoDb as database. Email password based Authentication and JWT for authorization. Firebase store handles all the data. A separate admin panel to perform a CURD operation and visualise the user and movies/series statistic.

#### Project Description

1. Admin

   - A Admin panel to perform a CURD operation and visualise the statistic
   - Only admin can perform following operation
   - Operation
     1. Create/Update/DELETE the user
     2. Create/Upadte/DELETE the Movies/Series
     3. Create/Update/DELETE the List(list of movies)

2. Client

   - A Netflix clone
   - A authorzied user can access all pages
   - It contain following page
     1. LOGIN
     2. REGISTER
     3. HOME
     4. MOVIE
     5. SERIES

3. Api
   - A api to handle route and perfrom CURD opertion on database
   - It has following route to handle CURD operation
     1. Auth route
        - To login and register the user
     2. Users route
        - Authorize user and admin can perform a CRUD operation.
     3. Movies route and List route
        - Admin can perform CURD operation
        - Authorize user can perform READ operation

#### Steps To Run in development mode

1. Fork the repo and clone it
2. for Backend API
   - `cd api` and `npm install` to install the dependeny in api folder
   - Make sure you have .env file with `MONO_DB_URL` and `SECRET_KEY`
   - `npm start` to start the server
3. for Admin
   - `cd admin` and `npm install` to install the dependeny in admin folder
   - create you project on firebase and add firbase config in _firebase.js_
   - `npm start` to start the admin panel
4. for client
   - `cd client` and `npm install` to install the dependeny in client folder
   - `npm start` to start the client

#### Glance of the project

1. Netflix HomePage

2. Admin HomePage

3. Admin MovieList

4. Create New Movie
