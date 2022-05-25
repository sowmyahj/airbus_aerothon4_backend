const db = require("../dbConnector.js");
const Login = db.sequelize.define("login", {
  username: {
    type: db.Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  password: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Login;
