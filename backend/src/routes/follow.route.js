const express = require("express");
const followController = require("../controllers/follow.controller");
const ACCESS_ONLY_WITH_TOKEN = require("../middlewares/ACCESS_ONLY_WITH_TOKEN");
const validateNickInParamsExists = require("../middlewares/validateNickInParamsExists");
const validateLimitAndOffset = require("../middlewares/validateLimitAndOffset");
const ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED = require("../middlewares/ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED");

const router = express.Router();

// Get
router.get(
  "/list/followers/:nick",
  validateNickInParamsExists,
  ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED,
  validateLimitAndOffset,
  followController.getFollowersList
);
router.get(
  "/count/followers/:nick",
  validateNickInParamsExists,
  ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED,
  followController.getFollowersCount
);
router.get(
  "/list/following/:nick",
  validateNickInParamsExists,
  ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED,
  validateLimitAndOffset,
  followController.getFollowingList
);
router.get(
  "/count/following/:nick",
  validateNickInParamsExists,
  ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED,
  followController.getFollowingCount
);
router.get(
  "/check/follow-me/:nick",
  ACCESS_ONLY_WITH_TOKEN,
  validateNickInParamsExists,
  followController.userFollowingMe
);
router.get(
  "/check/i-follow/:nick",
  ACCESS_ONLY_WITH_TOKEN,
  validateNickInParamsExists,
  followController.iFollowUser
);

// Post
router.post(
  "/create/follow/:nick",
  ACCESS_ONLY_WITH_TOKEN,
  validateNickInParamsExists,
  followController.followUser
);

// Delete
router.delete(
  "/delete/follow/:nick",
  ACCESS_ONLY_WITH_TOKEN,
  validateNickInParamsExists,
  followController.unfollowUser
);

module.exports = router;
