const { urlencoded } = require('express');
var express = require('express');
var jsonParser = express.json();
var urlEncodedParser = express.urlencoded({extended:false});

module.exports = function(app, mysql){
    
    app.get('/rts/rts/:id', function(req,res){
        // Hae informaatio tietokannasta, tässä tapuksesa henkilö, jonka id:n arvo = id
        // Voidan esimerkiksi palauttaa data jsonina clientille osana responsea. 


        // Tehdään yhteys annetuilla parametreilla
        var con = mysql.createConnection({

            host: "localhost",
            user: "root",
            password: "",
            database: "rts"
        });
        con.connect();
        
        // Tehdään haku kannasta
        con.query('SELECT id, name FROM rts WHERE id='+req.params.id, 
            function(err, rows){
                
                if(err) throw err;
                console.log(rows[0].name);
                // Palautetana JSONina vaikka Unityyn
                res.json({name: rows[0].name});
            }
        );
        // Suljetaan tietokantayhteys
        con.end();
    });

    app.post('/rts/rts', urlEncodedParser, function(req,res){
        console.log("Unityssä painettiin k-kirjainta. TÄmä ajetaan!");


        var con = mysql.createConnection({

            host: "localhost",
            user: "root",
            password: "",
            database: "rts"
        });
        con.connect();

        var sql = "INSERT INTO rts (name) VALUES ('"+req.body.name+  "','" + req.body.score + "','" + req.body.waves + "')";

        con.query(sql, function(err, res)
        {
            if(err) throw err;
            console.log("Lisättiin uusi rivi tauluun person");
        });
        con.end();

        //Kun tieto on laitetttu tietokantaan, voidaan palauttaa jotain responsena takaisin unityyn
        res.json({name: req.body.name, score: req.body.score, waves: req.body.waves});

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