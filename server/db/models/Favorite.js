const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("favorite", {
  favorite: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: 0,
  },
});
