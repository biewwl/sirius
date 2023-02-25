const express = require("express");
const searchController = require("../controllers/searchController");

const router = express.Router();

router.get("/list/search", searchController.listSearch);

module.exports = router;
