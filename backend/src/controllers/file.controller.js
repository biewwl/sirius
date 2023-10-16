const getFile = async (req, res) => {
  const { url } = req.params;

  const folder = url.split("|")[0];
  const fileName = url.split("|")[1];

  const path = require("path");

  res.sendFile(path.join(__dirname, "../db/files", folder, fileName));
};

module.exports = { getFile };
