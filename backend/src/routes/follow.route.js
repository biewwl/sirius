const express = require("express");
const followController = require("../controllers/follow.controller");
const ACCESS_ONLY_WITH_TOKEN = require("../middlewares/ACCESS_ONLY_WITH_TOKEN");
const validateNickInParamsExists = require("../middlewares/validateNickInParamsExists");
const validateLimitAndOffset = require("../middlewares/validateLimitAndOffset");
const ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED = require("../middlewares/ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED");

const router = express.Router();

// Get
router.get(
  "/followers/:nick",
  validateNickInParamsExists,
  ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED,
  validateLimitAndOffset,
  followController.getFollowersList
);
router.get(
  "/followers/count/:nick",
  validateNickInParamsExists,
  ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED,
  followController.getFollowersCount
);
router.get(
  "/following/:nick",
  validateNickInParamsExists,
  ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED,
  validateLimitAndOffset,
  followController.getFollowingList
);
router.get(
  "/following/count/:nick",
  validateNickInParamsExists,
  ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED,
  followController.getFollowingCount
);
router.get(
  "/follow-me/:nick",
  ACCESS_ONLY_WITH_TOKEN,
  validateNickInParamsExists,
  followController.userFollowingMe
);
router.get(
  "/i-follow/:nick",
  ACCESS_ONLY_WITH_TOKEN,
  validateNickInParamsExists,
  followController.iFollowUser
);

// Post
router.post(
  "/follow/:nick",
  ACCESS_ONLY_WITH_TOKEN,
  ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED,
  validateNickInParamsExists,
  followController.followUser
);

// Delete
router.delete(
  "/unfollow/:nick",
  ACCESS_ONLY_WITH_TOKEN,
  validateNickInParamsExists,
  followController.unfollowUser
);

module.exports = router;
