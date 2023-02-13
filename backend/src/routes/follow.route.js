const express = require("express");
const followController = require("../controllers/follow.controller");
const validateToken = require("../middlewares/validateToken");

const router = express.Router();

router.get("/followers/:user_id", followController.getFollowers);
router.get("/followers/count/:user_id", followController.getFollowersCount);

router.get("/following/:user_id", followController.getFollowing);
router.get("/following/count/:user_id", followController.getFollowingCount);

router.post("/follow/:user_id", validateToken, followController.followUser);
router.post("/unfollow/:user_id", validateToken, followController.unfollowUser);

module.exports = router;
