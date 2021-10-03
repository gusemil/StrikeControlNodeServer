const express = require('express');
const app = express();
var mysql = require('mysql');
const port = 8000; 

var apicontroller = require('./apicontroller.js');

apicontroller(app,mysql);

app.listen(port, ()=>{
    console.log("Server listening");

});