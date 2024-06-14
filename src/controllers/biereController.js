const Biere = require("../models/biere");
const biereController = {};

biereController.getAll = (req, res) => {
  Biere.findAll()
    .then((bieres) => {
      return res.send(bieres);
    })
    .catch((error) => {
      res.status(400).send({ message: "Failed fetching bieres", error });
    });
};

biereController.getById = (req, res) => {
  const id = req.params.id;

  Biere.findByPk(id)
    .then((biere) => {
      if (!biere) {
        return res.send({ message: "Biere not found" });
      }
      return res.status(200).send(biere);
    })
    .catch((error) => {
      res.status(400).send({ message: "Failed fetching biere", error });
    });
};

biereController.create = (req, res) => {
  // if (!req.form.isValid) {
  //   res.status(400).json({ message: "Invalid Form" });
  // }

  const { name, description, degree, prix, barId } = req.body;
  const biere = { name, description, degree, prix, barId };

  Biere.create(biere)
    .then((biere) => {
      return res.status(201).send({ biere, message: "Biere created" });
    })
    .catch((error) => {
      res.status(400).send({
        message: "Failed creating biere",
        error: error.errors.map((e) => e.message),
      });
    });
};
biereController.update = (req, res) => {
  // if (!req.form.isValid) {
  //   res.status(400).json({ message: "Invalid Form" });
  // }

  const id = req.params.id;
  const { name, description, degree, prix } = req.body;
  const biere = { name, description, degree, prix };

  Biere.update(biere, { where: { id } })
    .then((biere) => {
      return res.status(200).send({ biere, message: "Biere updated !" });
    })
    .catch((error) => {
      res.status(400).send({ message: "Failed updating biere", error });
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
      res.status(400).send({ message: "Failed deleting biere", error });
    });
};


module.exports = biereController;
