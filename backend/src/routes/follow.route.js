const express = require("express");
const followController = require("../controllers/follow.controller");
const ACCESS_ONLY_UNBLOCKED = require("../middlewares/ACCESS_ONLY_UNBLOCKED");
const ACCESS_ONLY_NOT_LOGGED_OR_NOT_BLOCKED = require("../middlewares/ACCESS_ONLY_NOT_LOGGED_OR_NOT_BLOCKED");
const ACCESS_ONLY_WITH_EXISTENT_NICK = require("../middlewares/ACCESS_ONLY_WITH_EXISTENT_NICK");
const ACCESS_ONLY_WITH_TOKEN = require("../middlewares/ACCESS_ONLY_WITH_TOKEN");
const ACCESS_RESTRICTED = require("../middlewares/ACCESS_RESTRICTED");

const router = express.Router();

router.get(
  "/list/followers/:nick",
  ACCESS_ONLY_WITH_EXISTENT_NICK,
  ACCESS_RESTRICTED,
  followController.listFollowers
);
router.get(
  "/count/followers/:nick",
  ACCESS_ONLY_WITH_EXISTENT_NICK,
  ACCESS_ONLY_NOT_LOGGED_OR_NOT_BLOCKED,
  followController.countFollowers
);
router.get(
  "/list/following/:nick",
  ACCESS_ONLY_WITH_EXISTENT_NICK,
  ACCESS_RESTRICTED,
  followController.listFollowing
);
router.get(
  "/count/following/:nick",
  ACCESS_ONLY_WITH_EXISTENT_NICK,
  ACCESS_ONLY_NOT_LOGGED_OR_NOT_BLOCKED,
  followController.countFollowing
);
router.get(
  "/check/follow-me/:nick",
  ACCESS_ONLY_WITH_TOKEN,
  ACCESS_ONLY_WITH_EXISTENT_NICK,
  followController.checkFollowMe
);
router.get(
  "/check/i-follow/:nick",
  ACCESS_ONLY_WITH_TOKEN,
  ACCESS_ONLY_WITH_EXISTENT_NICK,
  followController.checkIFollow
);

router.post(
  "/create/follow/:nick",
  ACCESS_ONLY_WITH_TOKEN,
  ACCESS_ONLY_WITH_EXISTENT_NICK,
  ACCESS_ONLY_UNBLOCKED,
  followController.createFollow
);

router.delete(
  "/delete/follow/:nick",
  ACCESS_ONLY_WITH_TOKEN,
  ACCESS_ONLY_WITH_EXISTENT_NICK,
  ACCESS_ONLY_UNBLOCKED,
  followController.deleteFollow
);
router.delete(
  "/reject/follow/:nick",
  ACCESS_ONLY_WITH_TOKEN,
  ACCESS_ONLY_WITH_EXISTENT_NICK,
  ACCESS_ONLY_UNBLOCKED,
  followController.rejectFollow
);

router.put(
  "/accept/follow/:nick",
  ACCESS_ONLY_WITH_TOKEN,
  ACCESS_ONLY_WITH_EXISTENT_NICK,
  ACCESS_ONLY_UNBLOCKED,
  followController.acceptFollow
);

module.exports = router;
