const sequelize = require("sequelize");

const db = new sequelize({
  dialect: process.env.DB_DIALECT || "sqlite",
  storage: process.env.DB_DRIVER || "db.sqlite",
});

// Supprime et recrée la base de données à chaque redémarrage
db.sync({ force: true });

module.exports = db;
