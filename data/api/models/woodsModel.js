//Modèle : Woods
//
//Auteur Alain Dubé
//(c)2022 École Du Web
//
//Modèle pour gérer les Types de bois
//
var MongoClient = require('mongodb').MongoClient;
var dbname = global.gConfig.database;
var url = global.gConfig.databaseUrl + dbname;

var mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true });
var woodSchema = new mongoose.Schema( {
    id : Number,
    name: String,
    type: String,
    origin: String,
    dryingTime: String,
    temperature: String,
    note: Number
  });

  var mongooseWood = mongoose.model("wood", woodSchema);

  module.exports = mongooseWood;
