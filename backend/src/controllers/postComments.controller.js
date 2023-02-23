const postCommentsService = require("../services/postComments.service");
const statusCode = require("../utils/statusCode");

const getPostCommentsById = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const result = await postCommentsService.getPostCommentsById(postId);
    res.status(statusCode.SUCCESS_CODE).json(result);
  } catch (error) {
    next(error);
  }
};

const getPostCommentsCountById = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const result = await postCommentsService.getPostCommentsCountById(postId);
    res.status(statusCode.SUCCESS_CODE).json(result);
  } catch (error) {
    next(error);
  }
};

const commentPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { comment } = req.body;
    const { userId } = req;

    if (!comment) throw new Error("400 | Comment is required");

    await postCommentsService.commentPost(postId, userId, comment);
    res.status(statusCode.NO_CONTENT_CODE).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPostCommentsById,
  getPostCommentsCountById,
  commentPost,
};
