const express = require("express");
const fileController = require("../controllers/file.controller");

const router = express.Router();

// Get
router.get(
  "/files/:url",
  fileController.getFile
);

module.exports = router;
