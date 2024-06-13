const barController = require("../controllers/barsController");

const express = require("express");
const router = express.Router();

const barRouter = router.get("/", barController.getAll);

module.exports = barRouter;
