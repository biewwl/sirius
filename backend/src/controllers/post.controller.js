const postService = require("../services/post.service");
const userService = require("../services/user.service");
const followService = require("../services/follow.service");
const statusCode = require("../utils/statusCode");
const getIdsList = require("../utils/getIdsList");

const getPostById = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const result = await postService.getPostById(postId);
    res.status(statusCode.SUCCESS_CODE).json(result);
  } catch (error) {
    next(error);
  }
};

const getPostsById = async (req, res, next) => {
  try {
    const { nick } = req.params;
    const id = await userService.getUserIdByNick(nick);
    const result = await postService.getPostsById(id);
    res.status(statusCode.SUCCESS_CODE).json(result);
  } catch (error) {
    next(error);
  }
};

const getPostsCountById = async (req, res, next) => {
  try {
    const { nick } = req.params;
    const id = await userService.getUserIdByNick(nick);
    const result = await postService.getPostsCountById(id);
    res.status(statusCode.SUCCESS_CODE).json(result);
  } catch (error) {
    next(error);
  }
};

const getPostsFeedById = async (req, res, next) => {
  try {
    const { userId } = req;
    const followingList = await followService.getFollowingListById(
      userId,
      null,
      0
    );
    const followingIds = await getIdsList(followingList);
    const completeList = [userId, ...followingIds];
    const posts = await postService.getPostsFeedById(completeList);
    return res.status(statusCode.SUCCESS_CODE).json(posts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPostById,
  getPostsById,
  getPostsCountById,
  getPostsFeedById,
};
