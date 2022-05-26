const mongoose = require("mongoose");
const loginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const loginModel = mongoose.model("Login", loginSchema);

// initialize db  only once with default username/ password
async function initialize() {
  let count = await loginModel.countDocuments();
  if (count === 0) {
    new loginModel({
      username: "admin",
      password: "admin",
    }).save(function (err) {
      if (err) {
        console.log("Error intializing credentials:" + err);
      }
    });
  }
}

initialize();
module.exports = loginModel;
