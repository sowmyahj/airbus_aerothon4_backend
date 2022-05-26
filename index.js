const express = require("express");
const app = express();
var cors = require("cors");
var zip = require("express-easy-zip");

const router = require("./routes/router");

app.use(cors());
app.use(zip());

app.use(express.static("public"));
app.use(express.static("files"));

app.use("/api", router);

app.listen(3002, () => console.log("Server listening at port 3002"));
