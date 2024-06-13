const db = require("../config/database");
const { DataTypes } = require("sequelize");

const Bar = db.define("Bar", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  adresse: { type: DataTypes.STRING, allowNull: false },
  tel: { type: DataTypes.STRING, allowNull: true },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  description: { type: DataTypes.STRING, allowNull: true },
});

module.exports = Bar;
