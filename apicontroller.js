const { urlencoded } = require('express');
var express = require('express');
var jsonParser = express.json();
var urlEncodedParser = express.urlencoded({extended:false});

module.exports = function(app, mysql){
    
    app.get('/person/person/:id', function(req,res){
        // Hae informaatio tietokannasta, tässä tapuksesa henkilö, jonka id:n arvo = id
        // Voidan esimerkiksi palauttaa data jsonina clientille osana responsea. 


        // Tehdään yhteys annetuilla parametreilla
        var con = mysql.createConnection({

            host: "localhost",
            user: "root",
            password: "",
            database: "person"
        });
        con.connect();
        
        // Tehdään haku kannasta
        con.query('SELECT id, firstname, lastname FROM person WHERE id='+req.params.id, 
            function(err, rows){
                
                if(err) throw err;
                console.log(rows[0].firstname);
                // Palautetana JSONina vaikka Unityyn
                res.json({firstname: rows[0].firstname, lastname:rows[0].lastname});
            }
        );
        // Suljetaan tietokantayhteys
        con.end();
    });

    app.post('/person/person', urlEncodedParser, function(req,res){
        console.log("Unityssä painettiin k-kirjainta. TÄmä ajetaan!");


        var con = mysql.createConnection({

            host: "localhost",
            user: "root",
            password: "",
            database: "person" //opella node_backend
        });
        con.connect();

        var sql = "INSERT INTO person (firstname, lastname) VALUES ('"+req.body.firstname+  "','"+ req.body.lastname + "')";

        con.query(sql, function(err, res)
        {
            if(err) throw err;
            console.log("Lisättiin uusi rivi tauluun person");
        });
        con.end();

        //Kun tieto on laitetttu tietokantaan, voidaan palauttaa jotain responsena takaisin unityyn
        res.json({firstname: req.body.firstname, lastname: req.body.lastname});

    });

    /*
    app.post('/api/person', jsonParser, function(req,res){
        console.log(req.body.firstName); //firstName tai firstname?

        // Tieto tulee tänne JSON muodossa. Lisätään henkilön tiedot tietokantaan

    });
    */

    app.delete('/person/person/:id', function(req,res){
        // Tännekin tieto voi tulla jostain json muodossa. 
        // POISTA informaatio eli henkilö tietokannasta. Tässä tapuksessa henkilö jonka id:n arvo on id. 

    });
}