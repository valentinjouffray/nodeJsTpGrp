const db = require("../config/database");
const { DataTypes } = require("sequelize");
const Bar = require("./bars");

const Biere = db.define("Biere", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: true },
  degree: { type: DataTypes.FLOAT, allowNull: false },
  prix: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validator: {
      isFloat: true,
      min: 0,
    },
  },
});

Bar.hasMany(Biere, {
  foreignKey: {
    name: "barId",
    allowNull: false,
  },
  onDelete: "CASCADE",
});

module.exports = Biere;
