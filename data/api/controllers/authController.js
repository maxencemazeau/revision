//Controlleur : authController
//
//Auteur Alain Dubé
//(c)2022 École Du Web
//
//Controlleur pour gérer les authentifications
//
// === resources mongodb

//Reference
//https://www.youtube.com/watch?v=NPJms-kg2F8

//Json Web Token

//Amélioration avec un refreshToken, voir https://www.youtube.com/watch?v=mbsmsi7l3r4
var jwtUtil = require('../util/utils.js');

exports.giveMeToken = function(req, res){

  var email = req.body.email;
  var applicationKey = req.body.appKey;

    //Ici nous devons vérifier su le Email est bien dans la base de donnees client avant de poursuivre.

    if (email == null || applicationKey == null  || (applicationKey!=  global.gConfig.AppToken ) )
        return res.status(400).json({"error":"Mauvais ou invalides parametres"});

   

    token = jwtUtil.generateTokenForUser({
            applicationKey:applicationKey});
    return res.status(200).json({"GeneretedToken" : token})
};
