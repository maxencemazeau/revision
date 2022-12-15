//Controlleur : logController
//
//Auteur Alain Dubé
//(c)2022 École Du Web
//
//Controlleur pour gérer les actions sur les logs
//
// === resources mongodb

//Aller chercher le modèle Log
const mongooseLog = require('../models/logModel');

//Fonction REST get_all
exports.getAll = function(req, res) {
    mongooseLog.find(
      function(err, db) {
        console.log("\t  Contenu de la base de données:\n");
        if (err) throw err;
        res.status(200).json(db);
        });
    };

//Fonction REST create_all
exports.createAll = function(req, res) {
    //Remove all document in the collections
    mongooseLog.deleteMany({}, function (err) {
        if(err) console.log(err);
        else
        console.log("Successful deletion of collection Log");

        var logObj = [
          new mongooseLog({idLog: '4', ip: '111.222.333.001', date: Date.now(), description: 'Try to acces API' }),
          new mongooseLog({idLog: '5', ip: '111.222.333.002', date: Date.now(), description: 'Try to acces API' })
          ];

          mongooseLog.insertMany(logObj,
            function (err) {
            if (err) {
              console.log(err);
              res.send('error in creation of collection Log ' + err);
              }
            else {
              console.log('New collection Log created'  );
              return res.status(201).json({"result" : "Nouvelle collection de Log créée"})
              }
            });

        });
  
    };
