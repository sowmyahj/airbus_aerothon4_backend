const express = require("express");
const app = express();
var cors = require('cors')
var zip = require('express-easy-zip');

const router= require('./routes/router')
// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
app.use(cors())
app.use(zip());

app.use(express.static('public'))
app.use(express.static('files'))

app.use('/',router)

app.get("/", (req, res) => {
    res.send("Hello World");
});
app.listen(3002,()=>console.log("Server listening at port 3002"));