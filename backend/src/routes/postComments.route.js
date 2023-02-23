const express = require("express");
const postCommentsController = require("../controllers/postComments.controller");
const validateNickInParamsExists = require("../middlewares/validateNickInParamsExists");
const sendNickPostOwnerToReq = require("../middlewares/sendNickPostOwnerToReq");
const ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED = require("../middlewares/ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED");
const ACCESS_ONLY_WITH_TOKEN = require("../middlewares/ACCESS_ONLY_WITH_TOKEN");
const validateExistsPost = require("../middlewares/validateExistsPost");

const router = express.Router();

// Get
router.get(
  "/post/comments/:postId",
  sendNickPostOwnerToReq,
  validateNickInParamsExists,
  ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED,
  validateExistsPost,
  postCommentsController.getPostCommentsById
);
router.get(
  "/post/comments/count/:postId",
  sendNickPostOwnerToReq,
  validateNickInParamsExists,
  ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED,
  validateExistsPost,
  postCommentsController.getPostCommentsCountById
);

// Post
router.post(
  "/post/comment/:postId",
  ACCESS_ONLY_WITH_TOKEN,
  validateExistsPost,
  postCommentsController.commentPost
);

// Delete

module.exports = router;
