const express = require("express");
const searchController = require("../controllers/search.controller");
const validateSearchQueries = require("../middlewares/validateSearchQueries");
const validateLimitAndOffset = require("../middlewares/validateLimitAndOffset");
const ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED = require("../middlewares/ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED");

const router = express.Router();

// Get
router.get(
  "/list/search",
  validateSearchQueries,
  ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED,
  validateLimitAndOffset,
  searchController.findByQuery
);

module.exports = router;
