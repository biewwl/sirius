const express = require("express");
const postController = require("../controllers/postComments.controller");

const ACCESS_ONLY_WITH_EXISTENT_POST = require("../middlewares/ACCESS_ONLY_WITH_EXISTENT_POST");
const ACCESS_ONLY_WITH_TOKEN = require("../middlewares/ACCESS_ONLY_WITH_TOKEN");
const ACCESS_RESTRICTED = require("../middlewares/ACCESS_RESTRICTED");

const router = express.Router();

router.get(
  "/list/post-comments/:postId",
  ACCESS_ONLY_WITH_EXISTENT_POST,
  ACCESS_RESTRICTED,
  postController.listPostComments
);
router.get(
  "/count/post-comments/:postId",
  ACCESS_ONLY_WITH_EXISTENT_POST,
  ACCESS_RESTRICTED,
  postController.countPostComments
);
router.post(
  "/create/post-comment/:postId",
  ACCESS_ONLY_WITH_TOKEN,
  ACCESS_ONLY_WITH_EXISTENT_POST,
  ACCESS_RESTRICTED,
  postController.createPostComment
);

module.exports = router;
