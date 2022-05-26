const express = require("express");
const router = express.Router();

const zip = require("express-easy-zip");
const templateController = require("../controller/template");

router.get(
  "/downloadProject/:projectName/:frontEnd/:backEnd/:db",
  templateController.fetchProj
);

module.exports = router;
