## Description du projet   
Création d'une API pour un site de bars qui permet de gérer les bars, les bières et les commandes des clients. Il permet aussi de faire des recherches avancées sur les bières et les commandes.
## Schéma de base de données
### Bars
  id : integer
  name : string, unique
  adresse: string
  tel: string, nullable
  email: string
  description: text, nullable

### Biere
  name: string
  description: text, nullable
  degree : float
  prix: float, min(0)
  bars_id: integer

### Biere_Commande (table de liaison)
  biere_id: integer
  commande_id: integer

### Commande
  name: string
  prix: float, min(0)
  bars_id: integer
  date: date
  status : string (en cours, terminée)

## Liste des endpoints
### BARS :
  POST /bars => Ajouter un bar
  PUT /bars/:id_bar => Modifier un bar
  DELETE /bars/:id_bar => Supprimer un bar
  GET /bars => Liste des bars
  GET /bars/:id_bar => Détail d'un bar

### BIERE :
  POST /bars/:id_bar/biere => Ajouter une bière à un bar
  PUT /biere/:id_biere => Modifier une bière
  DELETE /biere/:id_biere => Supprimer une bière d'un bar
  GET /bars/:id_bar/biere => Liste des bières d'un bar
  GET /biere/:id_biere => Détail d'une bière
### COMMANDE :  
  POST /bars/:id_bar/commandes => Ajouter une commande à un bar
  PUT /commandes/:id_commande => Modifier une commande d'un bar
  DELETE /commandes/:id_commande => Supprimer une commande d'un bar
  GET /bars/:id_bar/commandes => Liste des commandes d'un bar
  GET /commandes/:id => Détail d'une commande d'un bar

### BIERE_COMMANDE :
  POST /commandes/:id/biere/:id => Ajouter une bière à une commande
  DELETE /commandes/:id/biere/:id => Supprimer une bière d'une commande
  
## Liste des endpoints avancés
[ ]GET /bars/:id_bar/commandes?date=2021-01-01 => Liste des commandes d'un bar à une date donnée
[ ]GET /bars/:id_bar/commandes?prix_min=10&prix_max=20 => Liste des commandes d'un bar avec un prix compris entre 10 et 20
[ ] GET /bars?ville=Paris => Liste des bars d'une ville donnée
[ ] GET /bars?name=example => Liste des bars dont le nom contient "example"
[x] GET /bars/:id_bar/degree => Degré d'alcool moyen des bières d'un bar

## Liste des fichiers recommandés
- models/
  - models.js
  - bars.js
  - biere.js
  - commande.js
  - biere_commande.js
- router/
  - routers.js
  - barsRouter.js
  - biereRouter.js
  - commandeRouter.js
  - biere_commandeRouter.js
- controllers/
  - barsController.js
  - biereController.js
  - commandeController.js
  - biere_commandeController.js
- middleware/
  - form.js
- config/
  - database.js
.env
index.js
package.json

## Liste des modules à installer (recommandation)
- express
- sequelize
- sqlite3
- nodemon
- express-form
- dotenv
- faker (optionnel pour générer des fausses données dans sa base - aller voir la documentation)
- jest (optionnel, pour les tests)
- supertest (optionnel, pour les tests)

## Liste des contraintes sur mes routes et models :
- [x] Tous les champs obligatoires doivent être renseignés
- [x] Le nom d'un bar doit être unique
- [x] Le prix d'une bière doit être positif
- [x] Le prix d'une commande doit être positif
- [x] Le statut d'une commande doit être "en cours" ou "terminée"
- [x] Une commande ne peut pas être modifiée si elle est terminée
- [x] La date d'une commande ne peut pas être supérieure à la date du jour
- [x] Quand je supprime un bar, je supprime toutes les bières et les commandes associées
- [x] Quand je supprime une bière, je supprime toutes les commandes associées
- [x] Quand je supprime une commande, je supprime toutes les biere_commande associées

## Les endpoints avancés
[ ] GET /bars/:id_bar/degree?prix_min=10&prix_max=20 => Degré d'alcool moyen des bières d'un bar avec un prix compris entre 10 et 20
[ ] GET /bars/:id_bar/degree?date=2021-01-01 => Degré d'alcool moyen des bières des commandes d'un bar à une date donnée
[ ] GET /bars/:id_bar/commandes?date=2021-01-01&prix_min=10&prix_max=20 => Liste des commandes d'un bar à une date donnée avec un prix compris entre 10 et 20
[ ] GET /bars/:id_bar/commandes?date=2021-01-01&prix_min=10&prix_max=20&status=terminée => Liste des commandes d'un bar à une date donnée avec un prix compris entre 10 et 20 et terminée
[ ] GET /bars/:id_bar/commandes?date=2021-01-01&prix_min=10&prix_max=20&status=terminée&name=example => Liste des commandes d'un bar à une date donnée avec un prix compris entre 10 et 20 et terminée et dont le nom contient "example"
[ ] GET /bars/:id_bar/biere?sort=asc => Liste des bières d'un bar triées par ordre alphabétique  
[ ] GET /bars/:id_bar/biere?sort=desc => Liste des bières d'un bar triées par ordre alphabétique inversé
[ ] GET /bars/:id_bar/biere?sort=asc&limit=10 => Liste des bières d'un bar triées par ordre alphabétique et limitées à 10
[ ] GET /bars/:id_bar/biere?sort=asc&limit=10&offset=5 => Liste des bières d'un bar triées par ordre alphabétique et limitées à 10 en commençant à l'index 5
[ ] GET /bars/:id_bar/biere?sort=asc&limit=10&offset=5&degree_min=5&degree_max=10 => Liste des bières d'un bar triées par ordre alphabétique et limitées à 10 en commençant à l'index 5 avec un degré d'alcool compris entre 5 et 10
[ ] GET /bars/:id_bar/biere?sort=asc&limit=10&offset=5&degree_min=5&degree_max=10&prix_min=10&prix_max=20 => Liste des bières d'un bar triées par ordre alphabétique et limitées à 10 en commençant à l'index 5 avec un degré d'alcool compris entre 5 et 10 et un prix compris entre 10 et 20 (amusez-vous bien)
[ ] GET /commande/details/:id_commande => Renvoie un PDF de la commande

Tester les routes avec Jest et Supertest

Ajouter une authentification via JWT et accepter les requêtes POST, PUT et DELETE seulement si un bar est authentifié (ajoutez donc les champs email, password et token au modèle Bar).
