const Bar = require("../models/bars");
const Commande = require("../models/commande");
const Biere = require("../models/biere");
// const barsIndexMethodFinder = require("../services/barsIndexMethodFinder");
const barController = {};
const { Sequelize, Op } = require("sequelize");
// barController.index = (req, res) => {
//   const { query } = req;
//   const indexMethod = barsIndexMethodFinder(query);
//   indexMethod(req, res);
// };

barController.getAll = (req, res) => {
  if (Object.keys(req.query).length > 0) {
    console.log(req.query);
    if (req.query.ville) {
      console.log("ville");
      barController.getByCity(req, res);
    } else if (req.query.name) {
      console.log("name");
      barController.getByName(req, res);
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

barController.getBy = (req, res) => {
  const { query } = req;
  if (query.date) {
    console.log("date");
    barController.getCommandesByDate(req, res);
  } else if (req.query.prix_min && req.query.prix_max) {
    console.log("prix");
    barController.getCommandeBetweenPrices(req, res);
  } else {
    barController.getCommandesByBar(req, res);
  }
};

barController.create = (req, res) => {
  if (!req.form.isValid) {
    return res.status(400).json({ message: "Invalid Form" });
  }
  const { name, adresse, tel, email, description } = req.form;
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
  if (!req.form.isValid) {
    return res.status(400).json({ message: "Invalid Form" });
  }
  const { id } = req.params;
  const { name, adresse, tel, email, description } = req.form;
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
    include: [Commande],
  })
    .then((bar) => {
      if (!bar) {
        return res.status(404).json({ error: "Bar not found" });
      }
      const commandes = bar.Commandes.filter((commande) => {
        new Date(commande.date).getTime() == new Date(date).getTime();
        console.log(
          new Date(commande.date).getTime(),
          new Date(date).getTime()
        );
      });
      res.json(commandes);
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
  // console.log(`ville: ${ville}`);
  Bar.findAll()
    .then((bars) => {
      res.status(200).json(bars.filter((bar) => bar.adresse.includes(ville)));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

//GET /bars/:id_bar/biere => Liste des bières d'un bar
//GET /bars/:id_bar/biere?sort=asc => Liste des bières d'un bar triées par ordre alphabétique
//GET /bars/:id_bar/biere?sort=desc => Liste des bières d'un bar triées par ordre alphabétique inversé
//GET /bars/:id_bar/biere?sort=asc&limit=10 => Liste des bières d'un bar triées par ordre alphabétique et limitées à 10
//GET /bars/:id_bar/biere?sort=asc&limit=10&offset=5 => Liste des bières d'un bar triées par ordre alphabétique et limitées à 10 en commençant à l'index 5 PAS TERMINE
barController.getBieresByBarId = async (req, res) => {
  const barId = req.params.id_bar;
  const sort = req.query.sort;
  const limit = parseInt(req.query.limit, 10); // Convertit le paramètre limit en entier
  const offsetId = parseInt(req.query.offset, 10); // Convertit le paramètre offset en entier

  // Validation des paramètres sort limit et offset
  if (sort && sort !== "asc" && sort !== "desc") {
    return res
      .status(400)
      .json({ message: "Invalid sort parameter. Use 'asc' or 'desc'." });
  }

  if (limit && (isNaN(limit) || limit <= 0)) {
    return res
      .status(400)
      .json({ message: "Invalid limit parameter. Use a positive integer." });
  }

  if (offsetId && (isNaN(offsetId) || offsetId <= 0)) {
    return res
      .status(400)
      .json({ message: "Invalid offset parameter. Use a positive integer." });
  }

  let orderCondition = [];

  // Ajouter la condition de tri si le paramètre sort est présent
  if (sort) {
    orderCondition = [["name", sort]];
  }

  // Trouver l'index de l'id spécifique si offsetId est fourni
  let offset = 0;
  if (offsetId) {
    try {
      const offsetBeer = await Biere.findOne({
        where: {
          barId: barId,
          id: { [Op.gte]: offsetId },
        },
        order: [["name", sort]],
      });

      if (offsetBeer) {
        const allBeers = await Biere.findAll({
          where: {
            barId: barId,
            name: { [Op.lte]: offsetBeer.name },
          },
          order: [["name", sort]],
        });
        offset = allBeers.findIndex((b) => b.id === offsetId);
      } else {
        return res.status(404).json({
          message: "No beer found starting from the specified offset ID",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Failed to calculate offset for the specified ID",
        error,
      });
    }
  }

  const findOptions = {
    where: { barId: barId },
    order: orderCondition,
    limit: limit,
    offset: offset,
  };

  Biere.findAll(findOptions)
    .then((bieres) => {
      if (bieres.length === 0) {
        return res
          .status(404)
          .json({ message: "No biere found for the specified bar" });
      }
      res.status(200).json(bieres);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to fetch biere for the specified bar",
        error,
      });
    });
};

//GET /bars/:id_bar/degree => Degré d'alcool moyen des bières d'un bar
//GET /bars/:id_bar/degree?prix_min=10&prix_max=20 => Degré d'alcool moyen des bières d'un bar avec un prix compris entre 10 et 20
//Get /:id_bar/degree?date=2021-01-01

barController.getAverageDegreeByBarId = async (req, res) => {
  const { id_bar: barId } = req.params;
  const { date, prix_min: prixMin, prix_max: prixMax } = req.query;

  const isValidDate = !date || !isNaN(new Date(date).getTime());
  const isValidPriceRange =
    (!prixMin && !prixMax) ||
    (prixMin &&
      prixMax &&
      !isNaN(parseFloat(prixMin)) &&
      !isNaN(parseFloat(prixMax)));

  if (!isValidDate || !isValidPriceRange) {
    return res
      .status(400)
      .json({
        message:
          "Invalid query parameters. Use either a valid 'date' or both 'prix_min' and 'prix_max'.",
      });
  }

  const whereCondition = { barId };

  if (date) {
    const startDate = new Date(date);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    whereCondition.createdAt = { [Op.gte]: startDate, [Op.lt]: endDate };
  }

  if (prixMin && prixMax) {
    whereCondition.prix = {
      [Op.gte]: parseFloat(prixMin),
      [Op.lte]: parseFloat(prixMax),
    };
  }

  try {
    const bieres = await Biere.findAll({ where: whereCondition });

    if (bieres.length === 0) {
      return res
        .status(404)
        .json({ message: "No biere found for the specified filters" });
    }

    const totalDegrees = bieres.reduce((acc, biere) => acc + biere.degree, 0);
    const averageDegree = totalDegrees / bieres.length;

    return res.status(200).json({ averageDegree });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Failed to calculate average degree for the specified filters",
        error,
      });
  }
};

barController.getByName = (req, res) => {
  const { name } = req.query;
  Bar.findAll()
    .then((bars) => {
      res.status(200).json(bars.filter((bar) => bar.name.includes(name)));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

barController.getCommandesByBar = (req, res) => {
  const { id } = req.params;
  Bar.findByPk(id, { include: [Commande] })
    .then((bar) => {
      if (!bar) {
        return res.status(404).json({ error: "Bar not found" });
      }
      res.json(bar.Commandes);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

barController.getAverageDegree = (req, res) => {
  const { id } = req.params;
  Bar.findByPk(id, { include: [Biere] })
    .then((bar) => {
      if (!bar) {
        return res.status(404).json({ error: "Bar not found" });
      }
      const averageDegree =
        bar.Bieres.reduce((acc, biere) => acc + biere.degree, 0) /
        bar.Bieres.length;
      res.json({ averageDegree });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

barController.getCommandeBetweenPrices = (req, res) => {
  const { id } = req.params;
  const { prix_min, prix_max } = req.query;
  Bar.findByPk(id, { include: [Commande] })
    .then((bar) => {
      if (!bar) {
        return res.status(404).json({ error: "Bar not found" });
      }
      const commandes = bar.Commandes.filter(
        (commande) => commande.prix >= prix_min && commande.prix <= prix_max
      );
      res.json(commandes);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

module.exports = barController;
