const express = require("express");
const searchController = require("../controllers/search.controller");
const validateAccessWithoutLogin = require("../middlewares/validateAccessWithoutLogin");
const validateSearchQueries = require("../middlewares/validateSearchQueries");

const router = express.Router();

// Get
router.get(
  "/search",
  validateAccessWithoutLogin,
  validateSearchQueries,
  searchController.findByQuery
);

module.exports = router;
