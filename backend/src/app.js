const express = require("express");
var cors = require("cors");
const folderName = require("./utils/folderName");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/files/:url", (req, res) => {
  const { url } = req.params;

  const folder = url.split("|")[0];
  const fileName = url.split("|")[1];

  res.sendFile(__dirname + `/db/files/${folder}/` + fileName);
});

module.exports = app;
