let express = require("express");
let router = express.Router();
let login_controller = require("../controllers/loginController");

router.post("/login", login_controller.authenticate);

module.exports = router;
