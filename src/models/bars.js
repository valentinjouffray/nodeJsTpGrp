const db = require("../config/database");
const { DataTypes } = require("sequelize");
const Biere = require("./biere");

const Bar = db.define("Bar", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  adresse: { type: DataTypes.STRING, allowNull: false },
  tel: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: true },
});

Bar.hasMany(Biere, {
    foreignKey: {
        name: "barId",
        allowNull: false,
    },
    onDelete: "CASCADE",
})

module.exports = Bar;
