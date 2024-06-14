const { Commande } = require("../models/models");
const { Sequelize } = require("sequelize");
const commandeController = {};

commandeController.getAll = (req, res) => {
  Commande.findAll()
    .then((commandes) => {
      return res.send(commandes);
    })
    .catch((error) => {
      res.status(400).send({ error: "Failed fetching commandes", error });
    });
};

commandeController.getById = (req, res) => {
  const id = req.params.id;

  Commande.findByPk(id)
    .then((commande) => {
      if (!commande) {
        return res.send({ error: "Commande not foud" });
      }
      return res.status(200).send(commande);
    })
    .catch((error) => {
      res.status(400).send({ error: "Failed fetching commande", error });
    });
};

commandeController.create = (req, res) => {
  if (!req.form.isValid) {
    res.status(400).json({ message: "Invalid Form", errors: req.form.errors });
  }

  const { prix, date, status, barId } = req.form;
  const commande = { prix, date, status, barId };
  if (new Date(commande.date) > new Date()) {
    res.status(400).send({ error: "Invalid date" });
  }
  Commande.create(commande)
    .then((commande) => {
      return res.status(201).send({ commande, message: "Commande created !" });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send({
        error: "Failed creating commande",
        errors: error.errors ? error.errors.map((e) => e.message) : error.name,
      });
    });
};

commandeController.update = async (req, res) => {
  if (!req.form.isValid) {
    res.status(400).json({ message: "Invalid Form", errors: req.form.errors });
  }

  const id = req.params.id;
  const { prix, date, status } = req.form;
  const updatedData = { prix, date, status };

  try {
    const commande = await Commande.findByPk(id);

    if (!commande) {
      return res.status(404).send({ error: "Commande not found" });
    }

    if (commande.status === "TERMINE") {
      return res
        .status(400)
        .send({ error: "Can't update commande with status TERMINE" });
    }

    await Commande.update(updatedData, { where: { id } });

    const updatedCommande = await Commande.findByPk(id);
    return res
      .status(200)
      .send({ commande: updatedCommande, message: "Commande updated!" });
  } catch (error) {
    return res.status(400).send({
      error: "Failed processing request",
      errors: error.errors ? error.errors.map((e) => e.message) : error.name,
    });
  }
};

commandeController.delete = (req, res) => {
  const id = req.params.id;

  Commande.destroy({ where: { id } })
    .then((nbCommandeDeleted) => {
      return res.status(200).send({
        message: `Commande deleted ! Number of Commande deleted : ${nbCommandeDeleted}`,
      });
    })
    .catch((error) => {
      res.status(400).send({ error: "Failed deleting commande", error });
    });
};

commandeController.addBiereToCommande = async (req, res) => {
  const { commandeId, biereId } = req.params;

  try {
    const commande = await Commande.findByPk(commandeId);

    if (!commande) {
      return res.status(404).send({ error: "Commande not found" });
    }

    if (commande.status === "TERMINE") {
      return res
        .status(400)
        .send({ error: "Can't update commande with status TERMINE" });
    }

    await commande.addBiere(biereId);

    return res.status(200).send({
      message: "Biere added to commande",
    });
  } catch (error) {
    return res.status(400).send({
      error: "Failed processing request",
      errors: error.errors ? error.errors.map((e) => e.message) : error.name,
    });
  }
};

commandeController.removeBiereFromCommande = async (req, res) => {
  const { commandeId, biereId } = req.params;

  try {
    const commande = await Commande.findByPk(commandeId);

    if (!commande) {
      return res.status(404).send({ error: "Commande not found" });
    }

    if (commande.status === "TERMINE") {
      return res
        .status(400)
        .send({ error: "Can't update commande with status TERMINE" });
    }

    await commande.removeBiere(biereId);

    return res.status(200).send({
      message: "Biere removed from commande",
    });
  } catch (error) {
    return res.status(400).send({
      error: "Failed processing request",
      errors: error.errors ? error.errors.map((e) => e.message) : error.name,
    });
  }
};

module.exports = commandeController;
