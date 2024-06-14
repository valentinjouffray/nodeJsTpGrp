const Bar = require("../models/bars");
const Commande = require("../models/commande");
// const barsIndexMethodFinder = require("../services/barsIndexMethodFinder");
const barController = {};
const Biere = require("../models/biere");
const { Sequelize, Op } = require("sequelize");
// barController.index = (req, res) => {
//   const { query } = req;
//   const indexMethod = barsIndexMethodFinder(query);
//   indexMethod(req, res);
// };

barController.getAll = (req, res) => {
  if (req.query) {
    if (req.query.ville) {
      barController.getByCity(req, res);
    } else return res.status(400).json({ error: "Bad request" });
  } else {
    Bar.findAll()
      .then((bars) => {
        res.json(bars);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};

barController.create = (req, res) => {
  const { name, adresse, tel, email, description } = req.body;
  Bar.create({
    name: name,
    adresse: adresse,
    tel: tel,
    email: email,
    description: description,
  })
    .then((bar) => {
      res.json({ bar, message: "Bar created successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errors: err.errors.map((e) => e.message) });
    });
};

barController.update = (req, res) => {
  const { id } = req.params;
  const { name, adresse, tel, email, description } = req.body;
  const updatedBar = {
    name: name,
    adresse: adresse,
    tel: tel,
    email: email,
    description: description,
  };
  Bar.update(updatedBar, { where: { id: id } })
    .then(() => {
      res.json({ message: "Bar updated successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

barController.delete = (req, res) => {
  const { id } = req.params;
  Bar.destroy({ where: { id: id } })
    .then(() => {
      res.json({ message: "Bar deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

barController.getById = (req, res) => {
  const { id } = req.params;
  Bar.findByPk(id)
    .then((bar) => {
      if (!bar) {
        return res.status(404).json({ error: "Bar not found" });
      }
      res.json(bar);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

barController.getCommandesByDate = (req, res) => {
  const { id } = req.params;
  const { date } = req.query;
  Bar.findByPk(id, {
    where: { date: date },
    include: [Commande],
  })
    .then((bar) => {
      if (!bar) {
        return res.status(404).json({ error: "Bar not found" });
      }
      res.json(bar);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

// GET /bars?ville=Paris => Liste des bars d'une ville donnée
// barRouter.get("/", barController.getByCity);
barController.getByCity = (req, res) => {
  const { ville } = req.query;
  console.log(`ville: ${ville}`);
  Bar.findAll()
    .then((bars) => {
      res.status(200).json(bars.filter((bar) => bar.adresse.includes(ville)));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

// GET /bars/:id_bar/biere => Liste des bières d'un bar
barController.getBieresByBarId = (req, res) => {
  const barId = req.params.id_bar;

  Biere.findAll({ where: { barId: barId } })
    .then((bieres) => {
      if (bieres.length === 0) {
        return res
          .status(404)
          .json({ message: "No biere found for the specified bar" });
      }
      res.status(200).json(bieres);
    })
    .catch((error) => {
      res
        .status(500)
        .json({
          message: "Failed to fetch biere for the specified bar",
          error,
        });
    });
};

//GET /bars/:id_bar/degree => Degré d'alcool moyen des bières d'un bar
//GET /bars/:id_bar/degree?prix_min=10&prix_max=20 => Degré d'alcool moyen des bières d'un bar avec un prix compris entre 10 et 20
//Get /:id_bar/degree?date=2021-01-01
barController.getAverageDegreeByBarId = (req, res) => {
  const barId = req.params.id_bar;
  const date = req.query.date;
  const prixMin = req.query.prix_min;
  const prixMax = req.query.prix_max;

  let whereCondition = { barId: barId };

  // Ajouter le filtre de date
  if (date) {
    const startDate = new Date(date);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    whereCondition.createdAt = {
      [Op.gte]: startDate,
      [Op.lt]: endDate,
    };
  }

  // Ajouter les filtres de prix
  if (prixMin) {
    whereCondition.prix = whereCondition.prix || {};
    whereCondition.prix[Op.gte] = parseFloat(prixMin);
  }

  if (prixMax) {
    whereCondition.prix = whereCondition.prix || {};
    whereCondition.prix[Op.lte] = parseFloat(prixMax);
  }

  Biere.findAll({ where: whereCondition })
    .then((bieres) => {
      if (bieres.length === 0) {
        return res
          .status(404)
          .json({ message: "No biere found for the specified date" });
      }

      const totalDegrees = bieres.reduce((acc, biere) => acc + biere.degree, 0);
      const averageDegree = totalDegrees / bieres.length;

      res.status(200).json({ averageDegree: averageDegree });
    })
    .catch((error) => {
      res
        .status(500)
        .json({
          message:
            "Failed to calculate average degree for the specified filters",
          error,
        });
    });
};

module.exports = barController;
