const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("dogPark", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lat: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lng: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  image_url: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  address_1: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  address_2: {
    type: Sequelize.STRING,
    allowNull: true,
  }
});
