const express = require("express");
const storyController = require("../controllers/story.controller");
const ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED = require("../middlewares/ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED");
const ACCESS_ONLY_WITH_TOKEN = require("../middlewares/ACCESS_ONLY_WITH_TOKEN");

const router = express.Router();

// Get
router.get(
  "/stories/feed",
  ACCESS_ONLY_WITH_TOKEN,
  ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED,
  storyController.getStoriesFeedById
);

module.exports = router;
