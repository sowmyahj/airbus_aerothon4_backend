let express = require("express");
let Login = require("../models/login");

exports.authenticate = function (req, res, next) {
  Login.find({ username: req.body.username }).exec(function (err, results) {
    if (err) {
      return next(err);
    }
    if (results === null || results.length == 0) {
      res.json({ response: "failure" });
    } else {
      if (results[0].password === req.body.password) {
        res.json({ response: "success" });
      } else {
        res.json({ response: "failure" });
      }
    }
  });
};
