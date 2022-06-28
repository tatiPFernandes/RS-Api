const express = require("express");
const routes = require("./config/routes")


const bodyParser = require("body-parser")
//const { json } = require("express");

const app = express();

app.use(bodyParser.json())
app.use(routes)
app.use(express.json())



app.listen(8080, console.log('Server is running on port 8080'))

exports.module = app

