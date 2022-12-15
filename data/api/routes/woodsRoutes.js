//Fichier de route pour le controleur woodsController
//
//Auteur : Alain Dube
//(c)2022 Ecole Du Web
//
const routes = require('express').Router();

/** Swagger tag woods
  * @swagger
 *  tags:
 *   name: woods
 *   description: Pour la gestion types de bois
 */

function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    return res.status(401).json({"message" : "Mauvais token"})
  }
}

/** Swagger definition BadToken
 * @swagger
 * definitions:
 *  BadToken:
 *   type: object
 *   properties:
 *    message:
 *     type: number
 *     description: Message de retour
 *     example: 'Mauvais token'
  */
/** Swagger definition WoodDefault
 * @swagger
 * definitions:
 *  WoodDefault:
 *   type: object
 *   properties:
 *    message:
 *     type: number
 *     description: identification du woods
 *     example: 'Connecté sur le controleur woods!'
  */
/** Swagger definition WoodData
 * @swagger
 * definitions:
 *  WoodData:
 *   type: object
 *   properties:
 *    id:
 *     type: number
 *     description: identification du woods
 *     example: '234'
 *    name:
 *     type: string
 *     description: Nom de bois (Erable, Epinette, Pin ...)
 *     example: 'Erable'
 *    type:
 *     type: string
 *     description: Type de bois ( dur, mou ...)
 *     example: 'dur'
 *    origin:
 *     type: string
 *     description: Provenance du bois ( Canada, US, Bresil...)
 *     example: 'Canada'
 *    dryingTime:
 *     type: string
 *     description: Temps de séchage du bois en secondes
 *     example: '13'
 *    temperature:
 *     type: string
 *     description: Température de séchage du bois en degrés Celsius
 *     example: '23'
 *    note:
 *     type: string
 *     description: Notes sur la qualité du bois sur 100
 *     example: '33' 
  */
/** Swagger definition WoodAdded
 * @swagger
 * definitions:
 *  WoodAdded:
 *   type: object
 *   properties:
 *    message:
 *     type: number
 *     description: Message retournée
 *     example: '1 wood inseré'
   */
/** Swagger definition WoodDeleted
 * @swagger
 * definitions:
 *  WoodDeleted:
 *   type: object
 *   properties:
 *    message:
 *     type: number
 *     description: Message retournée
 *     example: 'Woods supprimes'
   */
/** Swagger definition WoodGetNbre
 * @swagger
 * definitions:
 *  WoodGetNbre:
 *   type: object
 *   properties:
 *    Nbre:
 *     type: number
 *     description: Nbre total d'éléments
 *     example: '33'
*    Notes:
 *     type: number
 *     description: La note totale
 *     example: '34'
   */
/** Swagger definition WoodGetAllWoods
 * @swagger
 * definitions:
 *  WoodGetAllWoods:
 *   type: object
 *   properties:
 *    _id:
 *     type: number
 *     description: Identification
 *     example: '636c5d21aff782043bd82f62'
*    name:
 *     type: number
 *     description: Nom du bois
 *     example: 'Erable'
   */


/** Swagger get /api/woods/
 * @swagger
  * /api/woods/:
  *  get:
  *   summary: Action par défaut du Woods
 *   tags : [woods]
  *   description: Action par défaut du Log qui dit qu'on est bien connecté sur le copntroleur Wood
  *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/WoodDefault'
  *    500:
  *     description: Erreur lors du traitement de la demande
  */
routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connecté sur le controleur woods!' });
});

//Routes pour le controleur WoodsController
const woodsController = require('../controllers/woodsController');

/** Swagger get /api/woods/addWood/
 * @swagger
  * /api/woods/addWood/:
  *  post:
  *   summary: Ajout d'un bois
 *   tags : [woods]
  *   description: Action qui permet d'ajouter un bois dans la base de données
 *   requestBody:
  *    content:
  *     application/json:
  *      schema:
  *       $ref: '#/definitions/WoodData'
  *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/WoodAdded'
*    401:
 *     description: Mauvais token
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/BadToken'
*    403:
 *     description: Mauvaise authentification
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/BadToken'
  *    500:
  *     description: Erreur lors du traitement de la demande
  */
routes.post('/addWood', ensureToken, woodsController.addWood);

/** Swagger get /api/woods/clearAllWoods/
 * @swagger
  * /api/woods/clearAllWoods/:
  *  delete:
  *   summary: Effacer tous les bois de la base de données
 *   tags : [woods]
  *   description: Action qui permet d'effacer tous les bois de la base de données
   *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/WoodDeleted'
*    401:
 *     description: Mauvais token
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/BadToken'
*    403:
 *     description: Mauvaise authentification
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/BadToken'
  *    500:
  *     description: Erreur lors du traitement de la demande
  */
routes.delete('/clearAllWoods', ensureToken, woodsController.clearAllWoods);

/** Swagger get /api/woods/getWoodsNbre/
 * @swagger
  * /api/woods/getWoodsNbre/:
  *  get:
  *   summary: Obtenir le nombre de bois et leur valeur de qualité
 *   tags : [woods]
  *   description: Action qui permet d'obtenir le nombre de bois et leur valeur de qualité
   *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/WoodGetNbre'
  *    500:
  *     description: Erreur lors du traitement de la demande
  */
routes.get('/getWoodsNbre', woodsController.getWoodsNbre);

/** Swagger get /api/woods/getAllWoods/
 * @swagger
  * /api/woods/getAllWoods/:
  *  get:
  *   summary: Obtenir les bois de la base de données
 *   tags : [woods]
  *   description: Action qui permet d'obtenir les bois de la base de données
   *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/WoodGetAllWoods'
  *    500:
  *     description: Erreur lors du traitement de la demande
  */
routes.get('/getAllWoods', woodsController.getAllWoods);

/** Swagger get /api/woods/getWoodByJson/
 * @swagger
  * /api/woods/getWoodByJson/:
  *  post:
  *   summary: Retourne les bois selon des critères 
 *   tags : [woods]
  *   description: Action qui permet de retourne les bois selon des critères
*   requestBody:
  *    content:
  *     application/json:
  *      schema:
  *       $ref: '#/definitions/WoodData'
   *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/WoodData'
*    401:
 *     description: Mauvais token
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/BadToken'
*    403:
 *     description: Mauvaise authentification
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/BadToken'
  *    500:
  *     description: Erreur lors du traitement de la demande
  */
routes.post('/getWoodByJson', ensureToken, woodsController.getWoodByJson);

/** Swagger get /api/woods/getWood/:id
 * @swagger
 * /api/woods/getWood/{id}:
 *   get:
 *     summary: Retourne les bois selon des critères (id ou nom) passés en parametres
 *     tags: [woods]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: Identification Id ou Nom du bois
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *      200:
 *        description: success
 *        content:
 *         application/json:
 *          schema:
 *            $ref: '#/definitions/WoodData'
 *      401:
 *        description: Mauvais token
 *        content:
 *         application/json:
 *          schema:
 *           $ref: '#/definitions/BadToken'
 *      403:
 *        description: Mauvaise authentification
 *        content:
 *         application/json:
 *          schema:
 *           $ref: '#/definitions/BadToken'
 *      500:
 *        description: Erreur lors du traitement de la demande
 */
routes.get('/getWood/:id', ensureToken, woodsController.getWood);

module.exports = routes;