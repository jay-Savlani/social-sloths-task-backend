

Backend for an interactive web app programmed in Node Js.

Features: 
LOGIN/LOGOUT/SIGNUP
View all users data

Programming language used - Node Js. 
Database Used - mongoDB 
Driver used for mongoDb - mongoose 
Framework for node js - Express 
Operating system used - Linux Ubuntu 
Package used for encrypting password for security - bcrypt

This backend project is divided into three major categories.

db.config --> Defining url for connection to mongoose. 
Routes --> Impleted Route middlewares for protection unauthorized access. This folder has files for all the api routes including the express CRUD methods 
Controllers --> Handlers/callbacks that get called when performing CRUD Operations. 
Models --> Model schemas and instances of model to communicate with the mongoDB database

Additional points :- 
Implemented jsonwebtoken to sign and verify user authentication
Implemented b2a package to decode user email and password sent in authorization header to allow user to login
Implemented bcrypt package to stored hashed password in the database.
Implemented dotenv package to access enviroment variables

Entry point for Node js server :- server.js

Steps :-

Install mongoDB database from mongoDB community from MmongoDB offical website https://www.mongodb.com/try/download/community.
(For LINUX USERS) --> run command sudo systemctl start mongod // To start mongodb service
Clone the git repo in any folder you wish.
Make sure you have node installed on your system.
Open the folder in terminal and run the command --> npm install // This will install all the package dependies listed in package.json file
run in terminal --> node server.js // This will start the server
Use MongoDb compass and postman to check the behaviour and working of the apis.
