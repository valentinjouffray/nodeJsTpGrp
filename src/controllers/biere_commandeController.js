const BiereCommande = require("../models/biere_commande");
const Biere = require("../models/biere");
const Commande = require("../models/commande");
let biereCommandeController = {};

biereCommandeController.getAll = (req, res) => {
  BiereCommande.findAll({
    // On fait un include pour faire une jointure entre les tables
    // sinon on ne récupère que les ids des tables liées, pas très utile...
    include: [Biere, Commande],
  })
    .then((biereCommandes) => {
      res.json(biereCommandes);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

biereCommandeController.create = (req, res) => {
  const { biereId, commandeId } = req.body;
  BiereCommande.create({
    biereId,
    commandeId,
  })
    .then((biereCommande) => {
      res.json({
        biereCommande,
        message: "BiereCommande created successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

biereCommandeController.update = (req, res) => {
  const id = req.params.id;
  const { biereId, commandeId } = req.body;
  BiereCommande.update(
    {
      biereId,
      commandeId,
    },
    {
      where: {
        id,
      },
    }
  )
    .then((biereCommande) => {
      res.json({
        biereCommande,
        message: "BiereCommande updated successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

biereCommandeController.delete = (req, res) => {
  const id = req.params.id;
  BiereCommande.destroy({
    where: {
      id,
    },
  })
    .then((biereCommande) => {
      res.json({
        biereCommande,
        message: "BiereCommande deleted successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

biereCommandeController.findById = (req, res) => {
  const id = req.params.id;
  BiereCommande.findByPk(id, {
    include: [Biere, Commande],
  })
    .then((biereCommande) => {
      if (!biereCommande) {
        return res.status(404).json({ error: "BiereCommande not found" });
      }
      res.json(biereCommande);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

module.exports = biereCommandeController;
