const express = require("express");
const postSavedController = require("../controllers/postSaved.controller");

const ACCESS_ONLY_WITH_EXISTENT_POST = require("../middlewares/ACCESS_ONLY_WITH_EXISTENT_POST");
const ACCESS_ONLY_WITH_TOKEN = require("../middlewares/ACCESS_ONLY_WITH_TOKEN");
const ACCESS_RESTRICTED = require("../middlewares/ACCESS_RESTRICTED");

const router = express.Router();

router.get(
  "/check/i-save/:postId",
  ACCESS_ONLY_WITH_TOKEN,
  ACCESS_ONLY_WITH_EXISTENT_POST,
  ACCESS_RESTRICTED,
  postSavedController.checkISave
);
router.get(
  "/list/posts-saved",
  ACCESS_ONLY_WITH_TOKEN,
  postSavedController.listSaved
);

router.post(
  "/create/post-save/:postId",
  ACCESS_ONLY_WITH_TOKEN,
  ACCESS_ONLY_WITH_EXISTENT_POST,
  ACCESS_RESTRICTED,
  postSavedController.createPostSave
);

router.delete(
  "/delete/post-save/:postId",
  ACCESS_ONLY_WITH_TOKEN,
  ACCESS_ONLY_WITH_EXISTENT_POST,
  postSavedController.deletePostSave
);

module.exports = router;
