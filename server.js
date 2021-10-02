const express = require('express');
const app = express();
var mysql = require('mysql');
//const apicontroller = require('./apicontroller');
const port = 8000; 

var apicontroller = require('./apicontroller.js');

/*
app.get('/', (req, res) =>{

    res.send('Hello');

});

app.get('/startGame', (req,res) =>{

    // Luodaan instansiointia varten informaatio-objekti, jossa on kaikki oleellilnen info Unitya varten
    var instanceInfo ={

        "action":"InstancePlayer",
        "color" : color,
        "position": [{name:"x", value:0+numberOfPlayers},{name:"y", value:"0.5"},{name:"z", value:"0"}]

    }
    numberOfPlayers++;
    // Lähetetään instansiointi-info takaisin Unityyn json muodossa. 
    res.json(instanceInfo);


});
*/

apicontroller(app,mysql);

app.listen(port, ()=>{
    console.log("Server listening");

});