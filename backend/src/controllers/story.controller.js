const storyService = require("../services/story.service");
const followService = require("../services/follow.service");
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

module.exports = {
  getStoriesFeedById,
};
