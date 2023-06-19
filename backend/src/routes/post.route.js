const express = require("express");
const postController = require("../controllers/post.controller");
const validateNickInParamsExists = require("../middlewares/validateNickInParamsExists");
const sendNickPostOwnerToReq = require("../middlewares/sendNickPostOwnerToReq");
const ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED = require("../middlewares/ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED");
const ACCESS_ONLY_WITH_TOKEN = require("../middlewares/ACCESS_ONLY_WITH_TOKEN");
const validateExistsPost = require("../middlewares/validateExistsPost");

const router = express.Router();

// Get
router.get(
  "/post/:postId",
  sendNickPostOwnerToReq,
  validateNickInParamsExists,
  ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED,
  validateExistsPost,
  postController.getPostById
);
router.get(
  "/post/comments/:postId",
  sendNickPostOwnerToReq,
  validateNickInParamsExists,
  ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED,
  validateExistsPost,
  postController.getPostCommentsById
);
router.get(
  "/post/comments/count/:postId",
  sendNickPostOwnerToReq,
  validateNickInParamsExists,
  ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED,
  validateExistsPost,
  postController.getPostCommentsCountById
);
router.get(
  "/post/likes/count/:postId",
  sendNickPostOwnerToReq,
  validateNickInParamsExists,
  ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED,
  validateExistsPost,
  postController.getPostLikesCountById
);
router.get(
  "/post/views/count/:postId",
  sendNickPostOwnerToReq,
  validateNickInParamsExists,
  ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED,
  validateExistsPost,
  postController.getPostViewsCountById
);
router.get(
  "/posts/:nick",
  validateNickInParamsExists,
  ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED,
  postController.getPostsByUserId
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
  ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED,
  postController.getPostsFeedById
);
router.get(
  "/post/i-like/:postId",
  ACCESS_ONLY_WITH_TOKEN,
  validateExistsPost,
  postController.getILikePost
);
router.get(
  "/post/i-save/:postId",
  ACCESS_ONLY_WITH_TOKEN,
  validateExistsPost,
  postController.getISavePost
);
router.get(
  "/posts/saved/list",
  ACCESS_ONLY_WITH_TOKEN,
  postController.getPostsSavedById
);

// Post
router.post(
  "/post/like/:postId",
  ACCESS_ONLY_WITH_TOKEN,
  validateExistsPost,
  postController.likePost
);
router.post(
  "/post/save/:postId",
  ACCESS_ONLY_WITH_TOKEN,
  validateExistsPost,
  postController.savePost
);
router.post(
  "/post/comment/:postId",
  ACCESS_ONLY_WITH_TOKEN,
  validateExistsPost,
  postController.commentPost
);

// Delete
router.delete(
  "/post/remove-saved/:postId",
  ACCESS_ONLY_WITH_TOKEN,
  validateExistsPost,
  postController.notSavePost
);
router.delete(
  "/post/unlike/:postId",
  ACCESS_ONLY_WITH_TOKEN,
  validateExistsPost,
  postController.unlikePost
);

module.exports = router;
