const express = require("express");
const postController = require("../controllers/post.controller");
const ACCESS_ONLY_NOT_LOGGED_OR_NOT_BLOCKED = require("../middlewares/ACCESS_ONLY_NOT_LOGGED_OR_NOT_BLOCKED");

const ACCESS_ONLY_WITH_EXISTENT_NICK = require("../middlewares/ACCESS_ONLY_WITH_EXISTENT_NICK");
const ACCESS_ONLY_WITH_EXISTENT_POST = require("../middlewares/ACCESS_ONLY_WITH_EXISTENT_POST");
const ACCESS_ONLY_WITH_TOKEN = require("../middlewares/ACCESS_ONLY_WITH_TOKEN");
const ACCESS_RESTRICTED = require("../middlewares/ACCESS_RESTRICTED");

const router = express.Router();

router.get(
  "/data/post/:postId",
  ACCESS_ONLY_WITH_EXISTENT_POST,
  ACCESS_ONLY_WITH_EXISTENT_NICK,
  ACCESS_RESTRICTED,
  postController.dataPost
);
router.get(
  "/list/posts/:nick",
  ACCESS_ONLY_WITH_EXISTENT_NICK,
  ACCESS_RESTRICTED,
  postController.listPosts
);
router.get(
  "/count/posts/:nick",
  ACCESS_ONLY_WITH_EXISTENT_NICK,
  ACCESS_ONLY_NOT_LOGGED_OR_NOT_BLOCKED,
  postController.countPosts
);
router.get(
  "/list/feed",
  ACCESS_ONLY_WITH_TOKEN,
  postController.listFeed
);

module.exports = router;
