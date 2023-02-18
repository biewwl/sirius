const postService = require("../services/post.service");
const userService = require("../services/user.service");
const statusCode = require("../utils/statusCode");

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

module.exports = {
  getPostById,
  getPostsById,
};
