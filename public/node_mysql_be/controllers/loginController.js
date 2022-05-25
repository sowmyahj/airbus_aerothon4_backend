let express = require("express");
let Login = require("../models/login");

exports.authenticate = async function (req, res, next) {
  let password = req.body.password;
  const login = await Login.findByPk(req.body.username);

  if (login === null) {
    res.json({ response: "failure" });
  } else {
    if (login.password === req.body.password) {
      res.json({ response: "success" });
    } else {
      res.json({ response: "failure" });
    }
  }
};
