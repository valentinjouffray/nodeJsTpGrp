const barController = require("../controllers/barsController");

const express = require("express");
const barRouter = express.Router();

barRouter.get("/", barController.getAll);
barRouter.post("/", barController.create);
//  Liste des commandes d'un bar à une date donnée
barRouter.get("/:id/commandes", barController.getCommandesByDate);
barRouter.put("/:id", barController.update);
barRouter.delete("/:id", barController.delete);
barRouter.get("/:id", barController.getById);

// GET /bars/:id_bar/commandes?date=2021-01-01 =>
// GET /bars?name=example => Liste des bars dont le nom contient "example"
// barRouter.get("/", barController.getByName);

module.exports = barRouter;
