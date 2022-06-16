# Nasa-web-app
This is a web app that is used to create launches to  certain planets extracted from Nasa database and parsed via csv-parser ,
and delete and abort launches as well 
## I have built the backend using the following technologies:
### -Nodejs 
### -Expressjs  
## Middlewares used:
### -Cors: to allow server to connect to frontend via whitelisting. 
### -Csv-parser:to parse data from csv files. 
### -Morgan: to log requests.  
## How the app is structured: 
### 1-MVC model is followed to design the backend . 
### 2-CRUD operations are implemented to insure full functionality. 
### 3-Filepath module is used to send files from frontend to backend.
### 4-Static files middleware is used to serve static frontend files without the need to deploy the client and server together.    
### The front end is served via Reactjs and Create react-app.
