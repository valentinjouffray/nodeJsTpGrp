const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Biere = require("./biere");
const Commande = require("./commande");

const BiereCommande = sequelize.define("BiereCommande", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
    biereId: {
      type: DataTypes.INTEGER,
      reference: {
        model: Biere,
        key: "id",
      },
    },
    commandeId: {
      type: DataTypes.INTEGER,
      reference: {
        model: Commande,
        key: "id",
      },
    },
});

Biere.belongsToMany(Commande, {
  through: "BiereCommande",
  foreignKey: "biereId",
});
Commande.belongsToMany(Biere, {
  through: "BiereCommande",
  foreignKey: "commandeId",
});

module.exports = BiereCommande;
