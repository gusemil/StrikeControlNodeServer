const { urlencoded } = require('express');
var express = require('express');
var jsonParser = express.json();
var urlEncodedParser = express.urlencoded({extended:false});

module.exports = function(app, mysql){

    app.get('/rts/rts/', function(req,res){
        console.log("Run a get all tables request from Unity!");

        // Create connection with parameters
        var con = mysql.createConnection({

            host: "localhost",
            user: "root",
            password: "",
            database: "rts"
        });
        con.connect();
        
        // Query by id
        con.query('SELECT * FROM `rts` ORDER BY score DESC LIMIT 0, 5', 
            function(err, rows){
                
                if(err) throw err;
                console.log(rows);
                var JsonString = JSON.stringify(rows);
                console.log(JsonString);

                //returned as JSON (to Unity)
                res.json({rows});
            }
        );
        // Close database connection
        con.end();
    });

    app.post('/rts/rts', urlEncodedParser, function(req,res){
        console.log("Run a post request from Unity!");

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
}