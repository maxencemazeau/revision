//Controlleur : EleveController
//
//Auteur Alain Dubé
//(c)2020 École Du Web
//
//Controlleur pour gérer les actions sur les logs
//
// === resources mongodb

const Eleve = require('../models/eleveModel');

var jwt = require('jsonwebtoken');

var express = require('express'),
  app = express(),
  port;
app.use(express.json());

//ALAIN MOI J'AVAIS TROIS ACTIONS EXPORTS ICI
exports.clearAllEleve = function(req, res){
  jwt.verify(req.token, global.gConfig.AppToken, function(err, data){
    if(err)
    {
        res.sendStatus(403);
        res.json({"message": 'Mauvais Token'});
    }
    else
    {
        
        Eleve.deleteMany({}, function(err){
          if (err) 
            {
                console.log(err);
                res.json({message: err});
            }
            else
            {
                console.log("eleves supprimer");
                res.json({message: "eleves supprimer"});
            }
        })
    }
    
});
};
exports.addEleve = function(req, res){
  jwt.verify(req.token, global.gConfig.AppToken, function(err, data){
    if(err)
    {
        res.sendStatus(403);
        res.json({"message": 'Mauvais Token'});
    }
    else
    {
        
        var eleveObj = new Eleve({id: req.body.id, nom: req.body.nom, prenom: req.body.prenom, note: req.body.note});

        Eleve.create(eleveObj, function(err) {
            if (err) 
            {
                console.log(err);
                res.json({message: err});
            }
            else
            {
                console.log("1 eleve inserée");
                res.json({message: "1 eleve inserée"});
            }
            
        });
    }
    
});
};
exports.getElevesNbreEchec = function(req, res){
  Eleve.find(
    function(err, db) {
      console.log("\t  Contenu de la base de données:\n");
      if (err) throw err;
      var total = 0;
      for (var i in db) {
          var note = db[i].note;
          if(note < 60)
          {
            total += 1;
          }
      }
      res.json({"total":total});
      //res.send(db);
      });
};