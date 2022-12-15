//Modèle : Log
//
//Auteur Alain Dubé
//(c)2022 École Du Web
//
//Modèle pour gérer les Logs
//
var MongoClient = require('mongodb').MongoClient;
var dbname = global.gConfig.database;
var url = global.gConfig.databaseUrl + dbname;

var mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true });
var logSchema = new mongoose.Schema( {
    idLog : { type:Number, unique:true, index:true, required:true, default: 0},
    //idLog : { type:String, unique:true, index:true, required:true, default: "0"},
    ip: String,
    date : {type:Date, default:Date.now},
    description : String
  });
  var mongooseLog = mongoose.model("Log", logSchema);

  module.exports = mongooseLog;
