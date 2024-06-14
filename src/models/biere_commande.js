const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Biere = require("./biere");
const Commande = require("./commande");

// const BiereCommande = sequelize.define("BiereCommande", {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   biereId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: Biere,
//       key: "id",
//     },
//   },
//   commandeId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: Commande,
//       key: "id",
//     },
//   },
// });


// module.exports = BiereCommande;
