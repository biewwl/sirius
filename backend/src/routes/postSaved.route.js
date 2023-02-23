const express = require("express");
const postSavedController = require("../controllers/postSaved.controller");
const ACCESS_ONLY_WITH_TOKEN = require("../middlewares/ACCESS_ONLY_WITH_TOKEN");
const validateExistsPost = require("../middlewares/validateExistsPost");

const router = express.Router();

// Get
router.get(
  "/post/i-save/:postId",
  ACCESS_ONLY_WITH_TOKEN,
  validateExistsPost,
  postSavedController.getISavePost
);
router.get(
  "/posts/saved/list",
  ACCESS_ONLY_WITH_TOKEN,
  postSavedController.getPostsSavedById
);

// Post
router.post(
  "/post/save/:postId",
  ACCESS_ONLY_WITH_TOKEN,
  validateExistsPost,
  postSavedController.savePost
);

// Delete
router.delete(
  "/post/remove-saved/:postId",
  ACCESS_ONLY_WITH_TOKEN,
  validateExistsPost,
  postSavedController.notSavePost
);

module.exports = router;
