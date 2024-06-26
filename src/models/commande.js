const db = require("../config/database");
const { DataTypes } = require("sequelize");
const Bar = require("./bars");
// const Biere = require("./models");

// console.log(Biere);

const Commande = db.define("Commande", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  prix: {
    type: DataTypes.FLOAT,
    validate: {
      isFloat: true,
      min: 0,
    },
  },
  date: { type: DataTypes.DATE },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [["EN COURS", "TERMINE"]],
        msg: "Status must be either 'EN COURS' or 'TERMINE'",
      },
    },
  },
});

Bar.hasMany(Commande, {
  foreignKey: {
    name: "barId",
    allowNull: false,
  },
  onDelete: "CASCADE",
});

Commande.belongsTo(Bar, {
  foreignKey: "barId",
});

module.exports = Commande;
