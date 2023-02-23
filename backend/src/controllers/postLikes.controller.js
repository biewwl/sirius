const postLikesService = require("../services/postLikes.service");
const statusCode = require("../utils/statusCode");

const getPostLikesCountById = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const result = await postLikesService.getPostLikesCountById(postId);
    res.status(statusCode.SUCCESS_CODE).json(result);
  } catch (error) {
    next(error);
  }
};

const getILikePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req;
    const iLike = await postLikesService.verifyAlreadyLike(postId, userId);
    return res.status(statusCode.SUCCESS_CODE).json(iLike);
  } catch (error) {
    next(error);
  }
};

const likePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req;

    const alreadyLike = await postLikesService.verifyAlreadyLike(postId, userId);
    if (alreadyLike) throw new Error("400 | Already like");

    await postLikesService.likePost(postId, userId);

    res.status(statusCode.NO_CONTENT_CODE).json();
  } catch (error) {
    next(error);
  }
};

const unlikePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req;

    const alreadyLike = await postLikesService.verifyAlreadyLike(postId, userId);
    if (!alreadyLike) throw new Error("400 | Already unlike");

    await postLikesService.unlikePost(postId, userId);

    res.status(statusCode.NO_CONTENT_CODE).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPostLikesCountById,
  getILikePost,
  likePost,
  unlikePost,
};
