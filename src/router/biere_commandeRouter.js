const biereCommandeController = require("../controllers/biere_commandeController.js");

const express = require("express");
const biereCommandeRouter = express.Router();

biereCommandeRouter.get("/", biereCommandeController.getAll);
biereCommandeRouter.post("/", biereCommandeController.create);
biereCommandeRouter.put("/:id", biereCommandeController.update);
biereCommandeRouter.delete("/:id", biereCommandeController.delete);
biereCommandeRouter.get("/:id", biereCommandeController.findById);

module.exports = biereCommandeRouter;
