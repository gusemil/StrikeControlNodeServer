const express = require('express');
const app = express();
var mysql = require('mysql');
//const apicontroller = require('./apicontroller');
const port = 8000; 

var apicontroller = require('./apicontroller.js');

var numberOfPlayers = 0;

app.get('/', (req, res) =>{

    res.send('Hello');

});

app.get('/startGame', (req,res) =>{

    // Tämä funktion lähettää Unityyn tiedon, että instansioidaan pelaaja. Ensimmäinen pelaaja on sininen, toinen punainen
    var color;
    if(numberOfPlayers == 0){
        color = "blue";
    }else{
        color = "red";
    }
    
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


app.get('/user/:id', (req,res)=>{

    console.log("Unityssa painettiin välilyöntiä");
    var dummyData = {

        "userid":req.params["id"],
        "username": "antinTesti",
        "someArray": [
            {name: "attack", value:5},
            {name: "defence", value:3},
            {name: "health", value:20}
        ]
    }
    res.json(dummyData);

});



apicontroller(app,mysql);

app.listen(port, ()=>{
    console.log("Server listening");

});