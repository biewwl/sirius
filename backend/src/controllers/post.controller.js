const postService = require("../services/post.service");
const userService = require("../services/user.service");

const dataPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const data = await postService.dataPost(postId);

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const listPosts = async (req, res, next) => {
  try {
    const { nick } = req.params;
    const userId = await userService.getUserIdByUserNick(nick);

    const data = await postService.listPosts(userId);

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const countPosts = async (req, res, next) => {
  try {
    const { nick } = req.params;
    const userId = await userService.getUserIdByUserNick(nick);

    const data = await postService.countPosts(userId);

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const listFeed = async (req, res, next) => {
  try {
    const { userId } = req;

    const data = await postService.listFeed(userId);

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = { dataPost, listPosts, countPosts, listFeed };
