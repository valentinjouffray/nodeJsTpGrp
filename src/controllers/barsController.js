const Bar = require("../models/bars");
const Commande = require("../models/commande");
const Biere = require("../models/biere");
// const barsIndexMethodFinder = require("../services/barsIndexMethodFinder");
const barController = {};

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
