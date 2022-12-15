//Fichier de route pour le controleur authController
//
//Auteur : Alain Dube
//(c)2022 Ecole Du Web
//
const routes = require('express').Router();


/**
  * @swagger
 *  tags:
 *   name: auth
 *   description: Access to authorisation actions
 */

/**
 * @swagger
 * definitions:
 *  Root:
 *   type: object
 *   properties:
 *    message:
 *     type: string
 *     description: identification du log
 *     example: 'Mon API. Veuillez vous identifier s.v.p.'
  */

/**
 * @swagger
 * definitions:
 *  giveMeTokenAnswer:
 *   type: object
 *   properties:
 *    GeneretedToken:
 *     type: string
 *     description: Token retourné
 *     example: 'eyJhbGciO...XQiOjE2Njc5MzM1NDl9.ccvvue...Lhlew'
  */

/**
 * @swagger
 * definitions:
 *  giveMeTokenAsk:
 *   type: object
 *   properties:
 *    email:
 *     type: string
 *     description: Identification de l'usager
 *     example: 'user122@cegeprdl.ca'
 *    appKey:
 *     type: string
 *     description: Token de l'application
 *     example: 'eyJhbGc ... 2-yePephP4'
  */


/**
 * @swagger
 * definitions:
 *  giveMeTokenBadParameters:
 *   type: object
 *   properties:
 *    error:
 *     type: string
 *     description: Message d'usager
 *     example: 'Mauvais ou invalides parametres'
  */

//Routes

/** Swagger /
 * @swagger
 * /api/auth/:
 *  get:
 *   summary: Appel de bienvenue pour l'api
 *   tags : [auth]
 *   description: Demande de s'authentifier
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Root'
  *    500:
  *     description: Erreur lors du traitement de la demande
  */
//Par defaut (/api/auth)
routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Mon API. Veuillez vous identifier s.v.p.' });
});



 /**  Swagger /giveMeToken
 * @swagger
  * /api/auth/giveMeToken:
  *  post:
  *   summary: Demande un token d'authentification
  *   tags : [auth]
  *   description: Retourne un token d'identification
  *   requestBody:
  *    content:
  *     application/json:
  *      schema:
  *       $ref: '#/definitions/giveMeTokenAsk'
  *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/giveMeTokenAnswer'
  *    400:
  *     description: Connexion refusée
*     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/giveMeTokenBadParameters'
  */
//Routes pour le controleur authController
const AuthController = require('../controllers/authController');
routes.post('/giveMeToken', AuthController.giveMeToken);

module.exports = routes;
