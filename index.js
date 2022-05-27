const express = require("express");
const app = express();
var cors = require("cors");
var zip = require("express-easy-zip");
const port = process.env.port || 3002;

const router = require("./routes/router");

app.use(cors());
app.use(zip());

app.use(express.static("public"));
app.use(express.static("files"));
app.get('/home',(req,res)=>{
    res.send('<p>Hello home</p>')
})

app.use("/api", router);

app.listen(port, () => console.log(`Server listening at port ${port}`));
