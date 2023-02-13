const followService = require("../services/follow.service");
const formatFollows = require("../utils");

const getFollowers = async (req, res, next) => {
  try {
    const userId = req.params["user_id"];
    const response = await followService.getFollowers(userId);
    const formattedFollows = formatFollows(response, "follower");
    res.status(200).json(formattedFollows);
  } catch (error) {
    next(error);
  }
};

const getFollowing = async (req, res, next) => {
  try {
    const userId = req.params["user_id"];
    const response = await followService.getFollowing(userId);
    const formattedFollows = formatFollows(response, "following");
    res.status(200).json(formattedFollows);
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

module.exports = { getFollowers, getFollowing, followUser, unfollowUser };
