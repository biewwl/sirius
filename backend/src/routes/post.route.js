const express = require("express");
const postController = require("../controllers/post.controller");
const validateNickInParamsExists = require("../middlewares/validateNickInParamsExists");
const sendNickPostOwnerToReq = require("../middlewares/sendNickPostOwnerToReq");
const ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED = require("../middlewares/ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED");
const ACCESS_ONLY_WITH_TOKEN = require("../middlewares/ACCESS_ONLY_WITH_TOKEN");

const router = express.Router();

// Get
router.get(
  "/post/:postId",
  sendNickPostOwnerToReq,
  validateNickInParamsExists,
  ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED,
  postController.getPostById
);

router.get(
  "/posts/:nick",
  validateNickInParamsExists,
  ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED,
  postController.getPostsById
);

router.get(
  "/posts/count/:nick",
  validateNickInParamsExists,
  ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED,
  postController.getPostsCountById
);

router.get(
  "/feed",
  ACCESS_ONLY_WITH_TOKEN,
  postController.getPostsFeedById
);

module.exports = router;
