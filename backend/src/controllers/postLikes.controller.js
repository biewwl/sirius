const postLikesService = require("../services/postLikes.service");

const countPostLikes = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const count = await postLikesService.countPostLikes(postId);

    return res.status(200).json(count);
  } catch (error) {
    next(error);
  }
};

const checkILike = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req;

    const iLike = await postLikesService.checkLike(userId, postId);

    return res.status(200).json(iLike);
  } catch (error) {
    next(error);
  }
};

const createPostLike = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req;

    const { error } = await postLikesService.createPostLike(userId, postId);
    if (error) {
      const { code, message } = error;
      throw new Error(`${code} | ${message}`);
    }

    return res.status(204).json();
  } catch (error) {
    next(error);
  }
};

const deletePostLike = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req;

    const { error } = await postLikesService.deletePostLike(userId, postId);
    if (error) {
      const { code, message } = error;
      throw new Error(`${code} | ${message}`);
    }

    return res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = { countPostLikes, checkILike, createPostLike, deletePostLike };
