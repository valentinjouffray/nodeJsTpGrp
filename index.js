require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT || 3001;

const barRouter = require("./src/router/barsRouter");
const biereRouter = require("./src/router/biereRouter");
const commandeRouter = require("./src/router/commandeRouter");
const biereCommandeRouter = require("./src/router/biere_commandeRouter");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/bars", barRouter);
app.use("/bieres", biereRouter);

app.listen(PORT, () => {
  console.log("App started on port " + PORT);
});

// app.set("view engine", "ejs");
