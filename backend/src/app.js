const express = require("express");
var cors = require("cors");
const folderName = require("./utils/folderName");
const app = express();

app.use(express.json());
app.use(cors());

module.exports = app;
