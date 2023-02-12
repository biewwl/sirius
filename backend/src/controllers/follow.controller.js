const followService = require("../services/follow.service");

const getFollowers = async (req, res, next) => {
  try {
    const userId = req.params["user_id"];
    const response = await followService.getFollowers(userId);
    const formattedResponse = response.map((r) => {
      const {
        date,
        follower: { nick },
      } = r;
      return { date, nick };
    });
    res.send(formattedResponse);
    next();
  } catch (error) {
    next(error);
  }
};

const getFollowing = async (req, res, next) => {
  try {
    const userId = req.params["user_id"];
    const response = await followService.getFollowing(userId);
    const formattedResponse = response.map((r) => {
      const {
        date,
        following: { nick },
      } = r;
      return { date, nick };
    });
    res.send(formattedResponse);
    next();
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
    next();
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
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { getFollowers, getFollowing, followUser, unfollowUser };
