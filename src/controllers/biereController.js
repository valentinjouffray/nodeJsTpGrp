const { Biere } = require("../models/models");
const biereController = {};

biereController.getAll = (req, res) => {
  Biere.findAll()
    .then((bieres) => {
      return res.send(bieres);
    })
    .catch((error) => {
      res.status(400).send({ error: "Failed fetching bieres", error });
    });
};

biereController.getById = (req, res) => {
  const id = req.params.id;

  Biere.findByPk(id)
    .then((biere) => {
      if (!biere) {
        return res.send({ error: "Biere not found" });
      }
      return res.status(200).send(biere);
    })
    .catch((error) => {
      res.status(400).send({ error: "Failed fetching biere", error });
    });
};

biereController.create = (req, res) => {
  if (!req.form.isValid) {
    res.status(400).json({ message: "Invalid Form", errors: req.form.errors });
  }

  const { name, description, degree, prix, barId } = req.form;
  const biere = { name, description, degree, prix, barId };

  Biere.create(biere)
    .then((biere) => {
      return res.status(201).send({ biere, message: "Biere created" });
    })
    .catch((error) => {
      res.status(400).send({
        error: "Failed creating biere",
        errors: error.errors ? error.errors.map((e) => e.message) : error.name,
      });
    });
};

biereController.update = (req, res) => {
  if (!req.form.isValid) {
    res.status(400).json({ message: "Invalid Form", errors: req.form.errors });
  }
  const id = req.params.id;
  const { name, description, degree, prix } = req.form;
  const biere = { name, description, degree, prix };

  Biere.update(biere, { where: { id } })
    .then((biere) => {
      if (biere[0] === 0) {
        return res.status(200).send({ error: "Biere not found" });
      }
      return res.status(200).send({ biere, message: "Biere updated !" });
    })
    .catch((error) => {
      res.status(400).send({ error: "Failed updating biere", error });
    });
};

biereController.delete = (req, res) => {
  const id = req.params.id;

  Biere.destroy({ where: { id } })
    .then((nbDeleted) => {
      return res
        .status(200)
        .send({ message: `Number of biere deleted : ${nbDeleted}` });
    })
    .catch((error) => {
      res.status(400).send({ error: "Failed deleting biere", error });
    });
};


module.exports = biereController;
