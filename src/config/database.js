const sequelize = require("sequelize");

const db = new sequelize({
  dialect: process.env.DB_DIALECT || "sqlite",
  storage: process.env.DB_DRIVER || "db.sqlite",
});

db.sync();

module.exports = db;
