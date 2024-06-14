const commandeController = require("../controllers/commandeController");
const { commandeForm } = require("../middleware/form");

const express = require("express");
const commandeRouter = express.Router();

commandeRouter.get("/", commandeController.getAll);
commandeRouter.post("/", commandeForm, commandeController.create);
commandeRouter.put("/:id", commandeForm, commandeController.update);
commandeRouter.delete("/:id", commandeController.delete);
// GET /commandes/:id => Détail d'une commande d'un bar
commandeRouter.get("/:id", commandeController.getById);
// POST /commandes/:commandeId/biere/:biereId => Ajouter une bière à une commande
commandeRouter.post(
  "/:commandeId/biere/:biereId",
  commandeController.addBiereToCommande
);
// DELETE /commandes/:commandeId/biere/:biereId => Supprimer une bière d'une commande
commandeRouter.delete(
  "/commandes/:commandeId/biere/:biereId",
  commandeController.removeBiereFromCommande
);

module.exports = commandeRouter;
