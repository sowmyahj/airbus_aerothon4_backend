const db = require("../dbConnector.js");
const Notes = db.sequelize.define("Notes", {
  id: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  value: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Notes;
