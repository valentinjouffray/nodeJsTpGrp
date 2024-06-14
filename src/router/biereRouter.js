const biereController = require("../controllers/biereController");
const { biereForm } = require("../middleware/form");

const express = require("express");
const biereRouter = express.Router();

biereRouter.get("/", biereController.getAll);
biereRouter.post("/", biereForm, biereController.create);
biereRouter.put("/:id", biereForm, biereController.update);
biereRouter.delete("/:id", biereController.delete);
biereRouter.get("/:id", biereController.getById);

module.exports = biereRouter;
