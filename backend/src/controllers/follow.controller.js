const followService = require("../services/follow.service");
const userService = require("../services/user.service");

const listFollowers = async (req, res, next) => {
  try {
    const { nick } = req.params;
    const { userId: requesterId } = req;

    const requestedId = await userService.getUserIdByUserNick(nick);

    const followers = await followService.listFollowers(
      requesterId,
      requestedId
    );

    return res.status(200).json(followers);
  } catch (error) {
    next(error);
  }
};

const countFollowers = async (req, res, next) => {
  try {
    const { nick } = req.params;

    const requestedId = await userService.getUserIdByUserNick(nick);

    const countFollowers = await followService.countFollowers(requestedId);

    return res.status(200).json(countFollowers);
  } catch (error) {
    next(error);
  }
};

const listFollowing = async (req, res, next) => {
  try {
    const { nick } = req.params;
    const { userId: requesterId } = req;

    const requestedId = await userService.getUserIdByUserNick(nick);

    const following = await followService.listFollowing(
      requesterId,
      requestedId
    );

    return res.status(200).json(following);
  } catch (error) {
    next(error);
  }
};

const countFollowing = async (req, res, next) => {
  try {
    const { nick } = req.params;

    const requestedId = await userService.getUserIdByUserNick(nick);

    const countFollowing = await followService.countFollowers(requestedId);

    return res.status(200).json(countFollowing);
  } catch (error) {
    next(error);
  }
};

const checkFollowMe = async (req, res, next) => {
  try {
    const { nick } = req.params;
    const senderId = await userService.getUserIdByUserNick(nick);

    const { userId: receiverId } = req;

    const followMe = await followService.checkFollow(senderId, receiverId);

    return res.status(200).json(followMe);
  } catch (error) {
    next(error);
  }
};

const checkIFollow = async (req, res, next) => {
  try {
    const { nick } = req.params;
    const receiverId = await userService.getUserIdByUserNick(nick);

    const { userId: senderId } = req;

    const IFollow = await followService.checkFollow(senderId, receiverId);

    return res.status(200).json(IFollow);
  } catch (error) {
    next(error);
  }
};

const createFollow = async (req, res, next) => {
  try {
    const { nick } = req.params;
    const receiverId = await userService.getUserIdByUserNick(nick);

    const { userId: senderId } = req;

    const { error } = await followService.createFollow(senderId, receiverId);
    if (error) {
      const { code, message } = error;
      throw new Error(`${code} | ${message}`);
    }

    return res.status(204).json();
  } catch (error) {
    next(error);
  }
};

const deleteFollow = async (req, res, next) => {
  try {
    const { nick } = req.params;
    const receiverId = await userService.getUserIdByUserNick(nick);

    const { userId: senderId } = req;

    const { error } = await followService.deleteFollow(senderId, receiverId);
    if (error) {
      const { code, message } = error;
      throw new Error(`${code} | ${message}`);
    }

    return res.status(204).json();
  } catch (error) {
    next(error);
  }
};

const rejectFollow = async (req, res, next) => {
  try {
    const { nick } = req.params;
    const senderId = await userService.getUserIdByUserNick(nick);

    const { userId: receiverId } = req;

    const follow = await followService.rejectFollow(senderId, receiverId);
    const { error } = follow;
    if (error) {
      const { code, message } = error;
      throw new Error(`${code} | ${message}`);
    }

    return res.status(200).json(follow);
  } catch (error) {
    next(error);
  }
};

const acceptFollow = async (req, res, next) => {
  try {
    const { nick } = req.params;
    const senderId = await userService.getUserIdByUserNick(nick);

    const { userId: receiverId } = req;

    const follow = await followService.acceptFollow(senderId, receiverId);
    const { error } = follow;
    if (error) {
      const { code, message } = error;
      throw new Error(`${code} | ${message}`);
    }

    return res.status(200).json(follow);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listFollowers,
  countFollowers,
  listFollowing,
  countFollowing,
  checkFollowMe,
  checkIFollow,
  createFollow,
  deleteFollow,
  rejectFollow,
  acceptFollow,
};
