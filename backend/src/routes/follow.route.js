const express = require("express");
const followController = require("../controllers/follow.controller");
const checkAccessIsBlocked = require("../middlewares/checkAccessIsBlocked");
const validateToken = require("../middlewares/validateToken");
const validateNickInParamsExists = require("../middlewares/validateNickInParamsExists");

const router = express.Router();

router.get(
  "/followers/:nick",
  validateNickInParamsExists,
  followController.getFollowers
);
router.get(
  "/followers/count/:nick",
  validateNickInParamsExists,
  followController.getFollowersCount
);

router.get(
  "/following/:nick",
  validateNickInParamsExists,
  followController.getFollowing
);
router.get(
  "/following/count/:nick",
  validateNickInParamsExists,
  followController.getFollowingCount
);

router.get(
  "/user-follow-me/:nick",
  validateToken,
  validateNickInParamsExists,
  checkAccessIsBlocked,
  followController.userFollowingMe
);
router.get(
  "/me-follow-user/:nick",
  validateToken,
  validateNickInParamsExists,
  checkAccessIsBlocked,
  followController.meFollowUser
);

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
