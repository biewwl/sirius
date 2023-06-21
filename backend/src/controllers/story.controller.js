const storyService = require("../services/story.service");
const followService = require("../services/follow.service");
const userService = require("../services/user.service");
const statusCode = require("../utils/statusCode");
const getIdsList = require("../utils/getIdsList");

const getStoriesFeedById = async (req, res, next) => {
  try {
    const { userId } = req;
    const followingList = await followService.getFollowingListById(
      userId,
      null,
      0
    );
    const followingIds = await getIdsList(followingList);
    const completeList = [userId, ...followingIds];
    const stories = await storyService.getStoriesFeedById(completeList);
    return res.status(statusCode.SUCCESS_CODE).json(stories);
  } catch (error) {
    next(error);
  }
};

const getStoryById = async (req, res, next) => {
  try {
    const { storyId } = req.params;
    const story = await storyService.getStoryById(Number(storyId));
    return res.status(statusCode.SUCCESS_CODE).json(story);
  } catch (error) {
    next(error);
  }
};

const getStoryByNick = async (req, res, next) => {
  try {
    const { nick } = req.params;

    const userId = await userService.getUserIdByNick(nick);

    const stories = await storyService.getStoriesByNick(userId);
    return res.status(statusCode.SUCCESS_CODE).json(stories);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStoriesFeedById,
  getStoryById,
  getStoryByNick,
};
