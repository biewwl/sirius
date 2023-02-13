const express = require("express");
const followController = require("../controllers/follow.controller");
const validateToken = require("../middlewares/validateToken");

const router = express.Router();

router.get("/followers/:user_id", followController.getFollowers);
router.get("/following/:user_id", followController.getFollowing);
router.post("/follow/:user_id", validateToken, followController.followUser);
router.post("/unfollow/:user_id", validateToken, followController.unfollowUser);

module.exports = router;
