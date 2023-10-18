const express = require("express");
const fileController = require("../controllers/file.controller");
const ACCESS_ONLY_WITH_TOKEN = require("../middlewares/ACCESS_ONLY_WITH_TOKEN");
const { checkFileUpload } = require("../middlewares/multer");

const router = express.Router();

// Get
router.get(
  "/files/:url",
  fileController.getFile
);

module.exports = router;
