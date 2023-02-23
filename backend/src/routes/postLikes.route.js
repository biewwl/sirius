const express = require("express");
const postLikesController = require("../controllers/postLikes.controller");
const validateNickInParamsExists = require("../middlewares/validateNickInParamsExists");
const sendNickPostOwnerToReq = require("../middlewares/sendNickPostOwnerToReq");
const ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED = require("../middlewares/ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED");
const ACCESS_ONLY_WITH_TOKEN = require("../middlewares/ACCESS_ONLY_WITH_TOKEN");
const validateExistsPost = require("../middlewares/validateExistsPost");

const router = express.Router();

// Get
router.get(
  "/post/likes/count/:postId",
  sendNickPostOwnerToReq,
  validateNickInParamsExists,
  ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED,
  validateExistsPost,
  postLikesController.getPostLikesCountById
);
router.get(
  "/post/i-like/:postId",
  ACCESS_ONLY_WITH_TOKEN,
  validateExistsPost,
  postLikesController.getILikePost
);

// Post
router.post(
  "/post/like/:postId",
  ACCESS_ONLY_WITH_TOKEN,
  validateExistsPost,
  postLikesController.likePost
);

// Delete
router.delete(
  "/post/unlike/:postId",
  ACCESS_ONLY_WITH_TOKEN,
  validateExistsPost,
  postLikesController.unlikePost
);

module.exports = router;
