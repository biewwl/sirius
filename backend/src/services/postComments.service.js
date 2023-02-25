const { PostComments, User } = require("../db/models");

const getCommentOwnerIdByCommentId = async (commentId) => {
  const comment = await PostComments.findOne({
    where: { id: commentId },
    attributes: ["userId"],
  });
  return comment.userId;
};

const listPostComments = async (postId) => {
  const comments = await PostComments.findAll({
    where: { postId },
    include: [
      {
        model: User,
        as: "userComment",
        attributes: { exclude: ["id", "email", "password"] },
      },
    ],
    attributes: { exclude: ["userId"] },
  });

  return comments;
};

const countPostComments = async (postId) => {
  const count = await PostComments.count({
    where: { postId },
  });

  return count;
};

const createPostComment = async (postId, userId, comment) => {
  const commentData = await PostComments.create({
    postId,
    userId,
    comment,
  });

  return commentData;
};

module.exports = {
  getCommentOwnerIdByCommentId,
  listPostComments,
  countPostComments,
  createPostComment,
};
