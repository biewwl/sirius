const followService = require("../services/follow.service");
const userService = require("../services/user.service");
const { formatFollows } = require("../utils");

const getFollowersList = async (req, res, next) => {
  try {
    const { nick } = req.params;
    const id = await userService.getUserIdByNick(nick);
    const followers = await followService.getFollowersListById(id);
    const formattedFollowers = formatFollows(followers, "followers");
    res.status(200).json(formattedFollowers);
  } catch (error) {
    next(error);
  }
};

const getFollowersCount = async (req, res, next) => {
  try {
    const { nick } = req.params;
    const id = await userService.getUserIdByNick(nick);
    const followersCount = await followService.getFollowersCountById(id);
    res.status(200).json(followersCount);
  } catch (error) {
    next(error);
  }
};

const getFollowingList = async (req, res, next) => {
  try {
    const { nick } = req.params;
    const id = await userService.getUserIdByNick(nick);
    const following = await followService.getFollowingListById(id);
    const formattedFollowing = formatFollows(following, "following");
    res.status(200).json(formattedFollowing);
  } catch (error) {
    next(error);
  }
};

const getFollowingCount = async (req, res, next) => {
  try {
    const { nick } = req.params;
    const id = await userService.getUserIdByNick(nick);
    const followingCount = await followService.getFollowingCountById(id);
    res.status(200).json(followingCount);
  } catch (error) {
    next(error);
  }
};

const followUser = async (req, res, next) => {
  try {
    const receiverNick = req.params["nick"];
    const receiverId = await userService.getUserIdByNick(receiverNick);
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
    const receiverNick = req.params["nick"];
    const receiverId = await userService.getUserIdByNick(receiverNick);
    const { userId: senderId } = req;
    if (senderId === receiverId)
      throw new Error("401 | Follow yourself is not allowed");
    await followService.unfollowUser({ senderId, receiverId });
    res.status(200).json("ok");
  } catch (error) {
    next(error);
  }
};

const userFollowingMe = async (req, res, next) => {
  try {
    const senderNick = req.params["nick"];
    const senderId = await userService.getUserIdByNick(senderNick);
    const { userId: receiverId } = req;
    if (senderId === receiverId)
      throw new Error("401 | You don't follow yourself");
    const getFollow = await followService.alreadyFollowUser(
      senderId,
      receiverId
    );
    const doFollow = getFollow ? true : false;
    res.status(200).json(doFollow);
  } catch (error) {
    next(error);
  }
};

const iFollowUser = async (req, res, next) => {
  try {
    const receiverNick = req.params["nick"];
    const receiverId = await userService.getUserIdByNick(receiverNick);
    const { userId: senderId } = req;
    if (senderId === receiverId)
      throw new Error("401 | You don't follow yourself");
    const getFollow = await followService.alreadyFollowUser(
      senderId,
      receiverId
    );
    const following = getFollow ? true : false;
    res.status(200).json(following);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFollowersList,
  getFollowersCount,
  getFollowingList,
  getFollowingCount,
  userFollowingMe,
  iFollowUser,
  followUser,
  unfollowUser,
};
