const commandeController = require("../controllers/commandeController");

const express = require("express");
const commandeRouter = express.Router();

commandeRouter.get("/", commandeController.getAll);
commandeRouter.post("/", commandeController.create);
commandeRouter.put("/:id", commandeController.update);
commandeRouter.delete("/:id", commandeController.delete);
commandeRouter.get("/:id", commandeController.getById);

module.exports = commandeRouter;