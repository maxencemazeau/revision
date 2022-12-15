//Controlleur : WoodsController
//
//Auteur Alain Dubé
//(c)2022 École Du Web
//
//Controlleur pour gérer les actions sur les woods
//
// === resources mongodb

const mongooseWood = require('../models/woodsModel');

var jwt = require('jsonwebtoken');

var express = require('express'),
  app = express(),
  port;
app.use(express.json());

exports.clearAllWoods = function(req, res){
  jwt.verify(req.token, global.gConfig.AppToken, function(err, data){
    if(err) {
        res.sendStatus(403);
        res.json({"message": 'Mauvais Token'});
      }
      else {
        mongooseWood.deleteMany({}, function(err){
          if (err) {
                console.log(err);
                res.json({message: err});
            }
            else {
                console.log("Woods supprimer");
                //res.json({message: "Woods supprimes"});
                return res.status(200).json({"message":"Woods supprimes"});
            }
        })
    }
  });
};
exports.addWood = function(req, res){
  var arrayJsonObj = [];
  if(Array.isArray(req.body)) {
    arrayJsonObj = req.body; //Array of Json to Array of Json
    }
    else 
      arrayJsonObj.push(req.body); //Json to Array of Json

  arrayJsonObj.forEach(jSonObj => {
        var woodObj = new mongooseWood(jSonObj); 
        mongooseWood.create(woodObj, function(err) {
          if (err)  {
              console.log(err);
              return res.status(500).json({"message":"Erreur de traitement"});
          }
          else {
              console.log("Wood inseré : " + woodObj.name);
          }
        });
    });
    return res.status(200).json({"message": arrayJsonObj.length+" wood(s) inseré(s)"});
  };

exports.getWoodsNbre = function(req, res){
  mongooseWood.find(
    function(err, db) {
      console.log("\t  Contenu de la base de données woods:\n");
      if (err) throw err;
      var totalNotes = 0;
      var nbre = 0;
      for (var i in db) {
            totalNotes += db[i].note;   
            nbre += 1;
        }
      //res.json({"Nbre":nbre, "Notes" : totalNotes});
        return res.status(200).json({"Nbre":nbre, "Notes" : totalNotes});
      });
};

exports.getAllWoods = function(req, res){
  mongooseWood.find( { }, "name",
    function(err, db) {
      console.log("\t  Contenu de la base de données woods:\n");
      if (err) throw err;
        res.status(200).json(db);
      });
};

exports.getWoodByJson = function(req, res){
  mongooseWood.find( req.body, "",
    function(err, db) {
      console.log("\t  Contenu de la base de données woods:\n");
      if (err) throw err;
        res.status(200).json(db);
      });
};

//Verifier si on a un chiffre ou un string
function isNumeric(str) {
  if (typeof str != "string") return false  
  return !isNaN(str) && 
         !isNaN(parseFloat(str)) 
}

exports.getWood = function(req, res){
  var reqq = (isNumeric(req.params.id) ? JSON.parse('{"id" : "'+ req.params.id +'"}' ) : 
      JSON.parse('{"name" : "'+ req.params.id +'"}' ));
  mongooseWood.find( reqq, "",
    function(err, db) {
      console.log("\t  Contenu de la base de données woods:\n");
      if (err) throw err;
      res.status(200).json(db);
      });
};