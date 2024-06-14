const commandeController = require("../controllers/commandeController");

const express = require("express");
const commandeRouter = express.Router();

commandeRouter.get("/", commandeController.getAll);
commandeRouter.post("/", commandeController.create);
commandeRouter.put("/:id", commandeController.update);
commandeRouter.delete("/:id", commandeController.delete);
commandeRouter.get("/:id", commandeController.getById);
//   POST /commandes/:commandeId/biere/:biereId => Ajouter une bière à une commande
commandeController.post("/commandes/:commandeId/biere/:biereId", commandeController.addBiereToCommande);
//   DELETE /commandes/:commandeId/biere/:biereId => Supprimer une bière d'une commande
commandeController.delete("/commandes/:commandeId/biere/:biereId", commandeController.removeBiereFromCommande);

module.exports = commandeRouter;
