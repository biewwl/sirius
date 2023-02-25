const express = require("express");
const postViewsController = require("../controllers/postViews.controller");

const ACCESS_ONLY_WITH_EXISTENT_POST = require("../middlewares/ACCESS_ONLY_WITH_EXISTENT_POST");
const ACCESS_ONLY_WITH_TOKEN = require("../middlewares/ACCESS_ONLY_WITH_TOKEN");
const ACCESS_RESTRICTED = require("../middlewares/ACCESS_RESTRICTED");

const router = express.Router();

router.get(
  "/count/post-views/:postId",
  ACCESS_ONLY_WITH_EXISTENT_POST,
  ACCESS_RESTRICTED,
  postViewsController.countPostViews
);
module.exports = router;
