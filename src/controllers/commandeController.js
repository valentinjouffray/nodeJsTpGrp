const Commande = require("../models/commande");
const commandeController = {};

commandeController.getAll = (req, res) => {
  Commande.findAll()
    .then((commandes) => {
      return res.send(commandes);
    })
    .catch((error) => {
      res.status(400).send({ message: "Failed fetching commandes", error });
    });
};

commandeController.getById = (req, res) => {
  const id = req.params.id;

  Commande.findByPk(id)
    .then((commande) => {
      if (!commande) {
        return res.send({ message: "Commande not foud" });
      }
      return res.status(200).send(commande);
    })
    .catch((error) => {
      res.status(400).send({ message: "Failed fetching commande", error });
    });
};

commandeController.create = (req, res) => {
  if (!req.form.isValid) {
    res.status(400).json({ message: "Invalid Form" });
  }

  const {prix, date ,status} = req.form
  const commande = {prix, date ,status}
};

Commande.create(commande)
.then((commande)=>{
    return res.status(201).send({ commande, message : "Commande created !" })
}).catch((error) => {
  res.status(400).send({message : "Failed creating commande", error})
})


commandeController.update = (req, res) => {

if (!req.form.isValid){
  res.status(400).json({ message : "Invalid Form"})
}

const id = req.params.id
const {prix, date ,status} = req.form
const commande = { prix, date ,status }

Commande.update(commande, { where : { id }})
.then( (commande) => {
  return res.status(200).send({ commande, message : "Commande updated !" })
}).catch((error) => {
  res.status(400).send({message : "Failed updating commande", error})
})
}

controller.delete = (req, res) => {
const id = req.params.id

Commande.destroy({ where : { id }})
.then( (commande) => {
  return res.status(200).send({ commande, message : "Commande deleted !" })
}).catch((error) => {
  res.status(400).send({message : "Failed deleting commande", error})
})
}


module.exports = commandeController