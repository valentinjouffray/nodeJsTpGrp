const barController = require("../controllers/barsController");
const { barsForm } = require("../middleware/form");

const express = require("express");
const barRouter = express.Router();

barRouter.get("/", barController.getAll);
barRouter.post("/", barsForm, barController.create);
// GET /bars/:id/commandes?date=2021-01-01 => Liste des commandes d'un bar à une date donnée
// GET /bars/:id/commandes => Liste des commandes d'un bar
// GET /bars/:id_bar/commandes?prix_min=10&prix_max=20 => Liste des commandes d'un bar avec un prix compris entre 10 et 20
barRouter.get("/:id/commandes", barController.getBy);
// GET /bars/:id_bar/degree => Degré d'alcool moyen des bières d'un bar
barRouter.get("/:id/degree", barController.getAverageDegree);
barRouter.put("/:id", barsForm, barController.update);
barRouter.delete("/:id", barController.delete);
barRouter.get("/:id", barController.getById);
barRouter.get("/:id_bar/biere", barController.getBieresByBarId);
barRouter.get("/:id_bar/degree", barController.getAverageDegreeByBarId);

// GET /bars/:id_bar/commandes?date=2021-01-01 =>
// GET /bars?name=example => Liste des bars dont le nom contient "example"
// barRouter.get("/", barController.getByName);

module.exports = barRouter;
