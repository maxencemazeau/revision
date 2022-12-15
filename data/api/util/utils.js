//Utils : Utilitaires pour l'authentification
//
//Auteur Alain Dubé
//(c)2022 École Du Web
//
//Utilitaires
//  generateTokenForUser
//
var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = global.gConfig.AppToken;
module.exports = {
  generateTokenForUser: function(userData){
    return jwt.sign(
      {
        userEmail : userData.email,
        isAdmin : userData.appKey
      },
      JWT_SIGN_SECRET//,{expiresIn: '1h',} Never expire
    )

  }
}
