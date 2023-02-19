const followService = require("../services/follow.service");
const userService = require("../services/user.service");
const { formatFollows } = require("../utils");
const getOnlyPermittedUsersList = require("../utils/getOnlyPermittedUsersList");
const statusCode = require("../utils/statusCode");

const getFollowersList = async (req, res, next) => {
  try {
    const { nick } = req.params;
    const { limit, offset } = req.query;
    const { userId } = req;

    const id = await userService.getUserIdByNick(nick);

    const followers = await followService.getFollowersListById(
      id,
      limit,
      offset
    );

    const formattedFollowers = formatFollows(followers, "followers");
    const onlyPermittedUsers = await getOnlyPermittedUsersList(
      userId,
      formattedFollowers
    );
    res.status(statusCode.SUCCESS_CODE).json(onlyPermittedUsers);
  } catch (error) {
    next(error);
  }
};

const getFollowersCount = async (req, res, next) => {
  try {
    const { nick } = req.params;
    const id = await userService.getUserIdByNick(nick);
    const followersCount = await followService.getFollowersCountById(id);
    res.status(statusCode.SUCCESS_CODE).json(followersCount);
  } catch (error) {
    next(error);
  }
};

const getFollowingList = async (req, res, next) => {
  try {
    const { nick } = req.params;
    const { limit, offset } = req.query;
    const { userId } = req;

    const id = await userService.getUserIdByNick(nick);
    const following = await followService.getFollowingListById(
      id,
      limit,
      offset
    );
    const formattedFollowing = formatFollows(following, "following");
    const onlyPermittedUsers = await getOnlyPermittedUsersList(
      userId,
      formattedFollowing
    );
    res.status(statusCode.SUCCESS_CODE).json(onlyPermittedUsers);
  } catch (error) {
    next(error);
  }
};

const getFollowingCount = async (req, res, next) => {
  try {
    const { nick } = req.params;
    const id = await userService.getUserIdByNick(nick);
    const followingCount = await followService.getFollowingCountById(id);
    res.status(statusCode.SUCCESS_CODE).json(followingCount);
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
      throw new Error(
        `${statusCode.BAD_REQUEST_CODE} | Follow yourself is not allowed`
      );
    await followService.followUser({ senderId, receiverId });
    res.status(statusCode.NO_CONTENT_CODE).json();
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
      throw new Error(
        `${statusCode.BAD_REQUEST_CODE} | Follow yourself is not allowed`
      );
    await followService.unfollowUser({ senderId, receiverId });
    res.status(statusCode.NO_CONTENT_CODE).json();
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
      throw new Error(
        `${statusCode.BAD_REQUEST_CODE} | You don't follow yourself`
      );
    const getFollow = await followService.alreadyFollowUser(
      senderId,
      receiverId
    );
    const doFollow = getFollow ? true : false;
    res.status(statusCode.SUCCESS_CODE).json(doFollow);
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
      throw new Error(
        `${statusCode.BAD_REQUEST_CODE} | You don't follow yourself`
      );
    const getFollow = await followService.alreadyFollowUser(
      senderId,
      receiverId
    );
    const following = getFollow ? true : false;
    res.status(statusCode.SUCCESS_CODE).json(following);
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
