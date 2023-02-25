const postCommentsService = require("../services/postComments.service");

const listPostComments = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const comments = await postCommentsService.listPostComments(postId);

    return res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

const countPostComments = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const count = await postCommentsService.countPostComments(postId);

    return res.status(200).json(count);
  } catch (error) {
    next(error);
  }
};

const createPostComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { comment } = req.body;
    const { userId } = req;

    await postCommentsService.createPostComment(postId, userId, comment);

    return res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listPostComments,
  countPostComments,
  createPostComment,
};
