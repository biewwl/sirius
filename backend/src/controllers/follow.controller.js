const followService = require("../services/follow.service");
const formatFollows = require("../utils");

const getFollowers = async (req, res, next) => {
  try {
    const userId = req.params["user_id"];
    const followers = await followService.getFollowersForId(userId);
    const formattedFollowers = formatFollows(followers, "followers");
    res.status(200).json(formattedFollowers);
  } catch (error) {
    next(error);
  }
};

const getFollowersCount = async (req, res, next) => {
  try {
    const userId = req.params["user_id"];
    const followersCount = await followService.getFollowersCountForId(userId);
    res.status(200).json(followersCount);
  } catch (error) {
    next(error);
  }
};

const getFollowing = async (req, res, next) => {
  try {
    const userId = req.params["user_id"];
    const following = await followService.getFollowingForId(userId);
    const formattedFollowing = formatFollows(following, "following");
    res.status(200).json(formattedFollowing);
  } catch (error) {
    next(error);
  }
};

const getFollowingCount = async (req, res, next) => {
  try {
    const userId = req.params["user_id"];
    const followingCount = await followService.getFollowingCountForId(userId);
    res.status(200).json(followingCount);
  } catch (error) {
    next(error);
  }
};

const followUser = async (req, res, next) => {
  try {
    const receiverId = Number(req.params["user_id"]);
    const { userId: senderId } = req;
    if (senderId === receiverId)
      throw new Error("401 | Follow yourself is not allowed");
    await followService.followUser({ senderId, receiverId });
    res.status(200).json("ok");
  } catch (error) {
    next(error);
  }
};

const unfollowUser = async (req, res, next) => {
  try {
    const receiverId = Number(req.params["user_id"]);
    const { userId: senderId } = req;
    if (senderId === receiverId)
      throw new Error("401 | Follow yourself is not allowed");
    await followService.unfollowUser({ senderId, receiverId });
    res.status(200).json("ok");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFollowers,
  getFollowersCount,
  getFollowing,
  getFollowingCount,
  followUser,
  unfollowUser,
};
