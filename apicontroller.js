const { urlencoded } = require('express');
var express = require('express');
var jsonParser = express.json();
var urlEncodedParser = express.urlencoded({extended:false});

module.exports = function(app, mysql){
    
    app.get('/rts/rts/:id', function(req,res){
        //Get highscore data by id


        // Create connection with parameters
        var con = mysql.createConnection({

            host: "localhost",
            user: "root",
            password: "",
            database: "rts"
        });
        con.connect();
        
        // Query by id
        con.query('SELECT id, name, score, waves, faction FROM rts WHERE id='+req.params.id, 
            function(err, rows){
                
                if(err) throw err;
                console.log(rows[0].id);
                console.log(rows[0].name);
                console.log(rows[0].score);
                console.log(rows[0].waves);
                console.log(rows[0].faction);
                // Palautetana returned as JSON (to Unity)
                res.json({id: rows[0].id, name: rows[0].name, score:rows[0].score, waves:rows[0].waves, faction:rows[0].faction});
            }
        );
        // Close database connection
        con.end();
    });

    app.post('/rts/rts', urlEncodedParser, function(req,res){
        console.log("Run request from Unity!");


        var con = mysql.createConnection({

            host: "localhost",
            user: "root",
            password: "",
            database: "rts"
        });
        con.connect();

        var sql = "INSERT INTO rts (name, score, waves, faction) VALUES ('"+req.body.name+  "','"+ req.body.score + "','"+ req.body.waves + "','"+ req.body.faction + "')";

        console.log("Name: " + req.body.name);
        console.log("Score: " + req.body.score);
        console.log("Waves: " + req.body.waves);
        console.log("Faction: " + req.body.faction);

        con.query(sql, function(err, res)
        {
            if(err) throw err;
            console.log("Inserting new entry to high scores table");
        });
        con.end();

        //Returning data as a json response after insertion
        res.json({name: req.body.name, score: req.body.score, waves: req.body.waves, faction: req.body.faction});

    });

    /*
    app.post('/api/person', jsonParser, function(req,res){
        console.log(req.body.firstName); //firstName tai firstname?

        // Tieto tulee tänne JSON muodossa. Lisätään henkilön tiedot tietokantaan

    });
    */

    app.delete('/rts/rts/:id', function(req,res){
        // Tännekin tieto voi tulla jostain json muodossa. 
        // POISTA informaatio eli henkilö tietokannasta. Tässä tapuksessa henkilö jonka id:n arvo on id. 

    });
}