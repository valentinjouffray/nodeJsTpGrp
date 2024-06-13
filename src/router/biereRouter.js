const biereController = require("../controllers/biereController");

const express = require("express");
const biereRouter = express.Router();

biereRouter.get("/", biereController.getAll);
biereRouter.post("/", biereController.create);
biereRouter.put("/:id", biereController.update);
biereRouter.delete("/:id", biereController.delete);
biereRouter.get("/:id", biereController.getById);

module.exports = biereRouter;