const Bar = require("../models/bars");
const barController = {};

barController.getAll = (req, res) => {
  Bar.findAll()
    .then((bars) => {
      res.json(bars);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

module.exports = barController;
