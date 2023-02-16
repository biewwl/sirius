const express = require("express");
const followController = require("../controllers/follow.controller");
const checkAccessIsBlocked = require("../middlewares/checkAccessIsBlocked");
const validateToken = require("../middlewares/validateToken");
const validateNickInParamsExists = require("../middlewares/validateNickInParamsExists");
const validateAccessWithoutLogin = require("../middlewares/validateAccessWithoutLogin");

const router = express.Router();

// Get
router.get(
  "/followers/:nick",
  validateAccessWithoutLogin,
  validateNickInParamsExists,
  checkAccessIsBlocked,
  followController.getFollowersList
);
router.get(
  "/followers/count/:nick",
  validateAccessWithoutLogin,
  validateNickInParamsExists,
  checkAccessIsBlocked,
  followController.getFollowersCount
);

router.get(
  "/following/:nick",
  validateAccessWithoutLogin,
  validateNickInParamsExists,
  checkAccessIsBlocked,
  followController.getFollowingList
);
router.get(
  "/following/count/:nick",
  validateAccessWithoutLogin,
  validateNickInParamsExists,
  checkAccessIsBlocked,
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
