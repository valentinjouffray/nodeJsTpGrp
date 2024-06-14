const Biere = require("./biere");
const Commande = require("./commande");

Commande.belongsToMany(Biere, {
  through: "BiereCommande",
  foreignKey: "commandeId",
  otherKey: "biereId",
});

Biere.belongsToMany(Commande, {
  through: "BiereCommande",
  foreignKey: "biereId",
  otherKey: "commandeId",
});

module.exports = { Biere, Commande };