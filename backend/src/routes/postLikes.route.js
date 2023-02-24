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
  "/count/post-likes/:postId",
  sendNickPostOwnerToReq,
  validateNickInParamsExists,
  ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED,
  validateExistsPost,
  postLikesController.getPostLikesCountById
);
router.get(
  "/check/i-like/:postId",
  ACCESS_ONLY_WITH_TOKEN,
  validateExistsPost,
  postLikesController.getILikePost
);

// Post
router.post(
  "/create/post-like/:postId",
  ACCESS_ONLY_WITH_TOKEN,
  validateExistsPost,
  postLikesController.likePost
);

// Delete
router.delete(
  "/delete/post-like/:postId",
  ACCESS_ONLY_WITH_TOKEN,
  validateExistsPost,
  postLikesController.unlikePost
);

module.exports = router;
