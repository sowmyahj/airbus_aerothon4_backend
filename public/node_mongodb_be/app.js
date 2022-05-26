var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");

let starterRouter = require("./routes/starter");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/api", starterRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//Database
const mongoose = require("mongoose");
const dbConfig = require("./dbConfig");
mongoose.connect(dbConfig.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection; // get the default connection
db.on("error", console.error.bind(console, "MongoDB connection error:")); // binds to the error event

module.exports = app;
