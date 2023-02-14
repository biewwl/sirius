const express = require("express");
const followController = require("../controllers/follow.controller");
const checkAccessIsBlocked = require("../middlewares/checkAccessIsBlocked");
const validateToken = require("../middlewares/validateToken");
const validateNickInParamsExists = require("../middlewares/validateNickInParamsExists");

const router = express.Router();

// Get
router.get(
  "/followers/:nick",
  validateNickInParamsExists,
  followController.getFollowersList
);
router.get(
  "/followers/count/:nick",
  validateNickInParamsExists,
  followController.getFollowersCount
);

router.get(
  "/following/:nick",
  validateNickInParamsExists,
  followController.getFollowingList
);
router.get(
  "/following/count/:nick",
  validateNickInParamsExists,
  followController.getFollowingCount
);

router.get(
  "/follow-me/:nick",
  validateToken,
  validateNickInParamsExists,
  checkAccessIsBlocked,
  followController.userFollowingMe
);
router.get(
  "/i-follow/:nick",
  validateToken,
  validateNickInParamsExists,
  followController.iFollowUser
);

// Post
router.post(
  "/follow/:nick",
  validateToken,
  validateNickInParamsExists,
  followController.followUser
);
router.post(
  "/unfollow/:nick",
  validateToken,
  validateNickInParamsExists,
  followController.unfollowUser
);

module.exports = router;
