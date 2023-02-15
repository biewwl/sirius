const express = require("express");
const searchController = require("../controllers/search.controller");
const validateSearchQueries = require("../middlewares/validateSearchQueries");

const router = express.Router();

// Get
router.get("/search", validateSearchQueries, searchController.findByQuery);

module.exports = router;
