const express = require("express");
const postLikesController = require("../controllers/postLikes.controller");

const ACCESS_ONLY_WITH_EXISTENT_POST = require("../middlewares/ACCESS_ONLY_WITH_EXISTENT_POST");
const ACCESS_ONLY_WITH_TOKEN = require("../middlewares/ACCESS_ONLY_WITH_TOKEN");
const ACCESS_RESTRICTED = require("../middlewares/ACCESS_RESTRICTED");

const router = express.Router();

router.get(
  "/count/post-likes/:postId",
  ACCESS_ONLY_WITH_EXISTENT_POST,
  ACCESS_RESTRICTED,
  postLikesController.countPostLikes
);
router.get(
  "/check/i-like/:postId",
  ACCESS_ONLY_WITH_TOKEN,
  ACCESS_ONLY_WITH_EXISTENT_POST,
  ACCESS_RESTRICTED,
  postLikesController.checkILike
);

router.post(
  "/create/post-like/:postId",
  ACCESS_ONLY_WITH_TOKEN,
  ACCESS_ONLY_WITH_EXISTENT_POST,
  ACCESS_RESTRICTED,
  postLikesController.createPostLike
);

router.delete(
  "/delete/post-like/:postId",
  ACCESS_ONLY_WITH_TOKEN,
  ACCESS_ONLY_WITH_EXISTENT_POST,
  ACCESS_RESTRICTED,
  postLikesController.deletePostLike
);

module.exports = router;
