//Fichier de route pour le controleur logController
//
//Auteur : Alain Dube
//(c)2022 Ecole Du Web
//
const routes = require('express').Router();

/** Swagger tag log
  * @swagger
 *  tags:
 *   name: log
 *   description: Pour la gestion des logs
 */

//Routes pour le controleur LogController
const LogController = require('../controllers/logController');


/** Swagger definition LogsDefault
 * @swagger
 * definitions:
 *  LogsDefault:
 *   type: object
 *   properties:
 *    message:
 *     type: number
 *     description: identification du log
 *     example: 'Connecté sur le controleur log!'
  */

/** Swagger definition Logs
 * @swagger
 * definitions:
 *  Logs:
 *   type: object
 *   properties:
 *    idLog:
 *     type: number
 *     description: identification du log
 *     example: '1'
 *    ip:
 *     type: string
 *     description: l'adresse ip de l'appel
 *     example: '123.456.789.123'
 *    date:
 *     type: date
 *     description: la date du Log
 *     example: '10 nov 2022'
 *    description:
 *     type: string
 *     description: Description du log
 *     example: 'Ouverture d''une session'
  */
/** Swagger definition LogsSuccess
 * @swagger
 * definitions:
 *  LogsSuccess:
 *   type: object
 *   properties:
 *    result:
 *     type: string
 *     description: Message de retours
 *     example: 'Nouvelle collection de Log créée'
 * 
  */


/** Swagger get /api/log/
 * @swagger
  * /api/log/:
  *  get:
  *   summary: Action par défaut du Log
 *   tags : [log]
  *   description: Action par défaut du Log qui dit qu'on est bien connecté sur le copntroleur Log
  *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/LogsDefault'
  *    500:
  *     description: Erreur lors du traitement de la demande
  */
routes.get('/', (req, res) => { res.status(200).json({ message: 'Connecté sur le controleur log!' });});

/** Swagger get /api/log/getAll
 * @swagger
  * /api/log/getAll:
  *  get:
  *   summary: Obtient tous les éléments du Log
 *   tags : [log]
  *   description: Retourne le contenu des logs
  *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Logs'
  *    500:
  *     description: Erreur lors du traitement de la demande
  */
routes.get('/getAll', LogController.getAll);


/** Swagger post /api/log/createAll
 * @swagger
 * /api/log/createAll:
 *  post:
 *   summary: Création d'un exemple d'enregistrement du Log
 *   tags : [log]
 *   description: Efface et initialise avec un exemple d'enregistrement Log
  *   responses:
 *    201:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/LogsSuccess'
  *    500:
  *     description: Erreur lors du traitement de la demande
  */
routes.post('/createAll', LogController.createAll);

module.exports = routes;
