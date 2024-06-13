const db = require("../config/database");
const { DataTypes } = require("sequelize");
const Bar = require("./bars");

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

Bar.hasMany(Commande, {
  foreignKey: {
    name: "barId",
    allowNull: false,
  },
  onDelete: "CASCADE",
});

module.exports = Commande;
