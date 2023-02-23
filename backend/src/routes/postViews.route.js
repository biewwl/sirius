const express = require("express");
const postViewsController = require("../controllers/postViews.controller");
const validateNickInParamsExists = require("../middlewares/validateNickInParamsExists");
const sendNickPostOwnerToReq = require("../middlewares/sendNickPostOwnerToReq");
const ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED = require("../middlewares/ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED");
// const ACCESS_ONLY_WITH_TOKEN = require("../middlewares/ACCESS_ONLY_WITH_TOKEN");
const validateExistsPost = require("../middlewares/validateExistsPost");

const router = express.Router();

// Get
router.get(
  "/post/views/count/:postId",
  sendNickPostOwnerToReq,
  validateNickInParamsExists,
  ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED,
  validateExistsPost,
  postViewsController.getPostViewsCountById
);

// Post

// Delete

module.exports = router;
