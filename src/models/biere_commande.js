const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Biere = require('./biere');
const Commande = require('./commande');

const BiereCommande = sequelize.define('BiereCommande', {});

Biere.belongsToMany(Commande, { through: 'BiereCommande' });
Commande.belongsToMany(Biere, { through: 'BiereCommande' });

module.exports = BiereCommande;