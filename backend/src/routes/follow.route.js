const express = require("express");
const followController = require("../controllers/follow.controller");
const validateToken = require("../middlewares/validateToken");

const router = express.Router();

router.get("/followers/:nick", followController.getFollowers);
router.get("/followers/count/:nick", followController.getFollowersCount);

router.get("/following/:nick", followController.getFollowing);
router.get("/following/count/:nick", followController.getFollowingCount);

router.post("/follow/:nick", validateToken, followController.followUser);
router.post("/unfollow/:nick", validateToken, followController.unfollowUser);

module.exports = router;
