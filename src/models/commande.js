const db = require("../config/database");
const { DataTypes } = require("sequelize");

const Commande = db.define("Commande", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  prix: {
    type: DataTypes.FLOAT,
    validator: {
      isFloat: true,
      min: 0,
    },
  },
  date: { type: DataTypes.DATE },
  status: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Commande;
