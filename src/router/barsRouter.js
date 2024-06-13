const barController = require("../controllers/barsController");

const express = require("express");
const barRouter = express.Router();

barRouter.get("/", barController.getAll);
barRouter.post("/", barController.create);
barRouter.put("/:id", barController.update);
barRouter.delete("/:id", barController.delete);
barRouter.get("/:id", barController.getById);

module.exports = barRouter;
