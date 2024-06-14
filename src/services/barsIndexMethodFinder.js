const barController = require("../controllers/barsController");

const barsIndexMethodFinder = (queryParams) => {
  if (queryParams.ville) {
    return barController.getByCity;
  } else {
    return barController.getAll;
  }
};

module.exports = barsIndexMethodFinder;
