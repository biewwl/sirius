const { PostLikes } = require("../db/models");
const error = require("../utils/error");

const checkLike = async (userId, postId) => {
  const like = await PostLikes.findOne({
    where: {
      userId,
      postId,
    },
  });

  const likeBoolean = like ? true : false;
  return likeBoolean;
};

const countPostLikes = async (postId) => {
  const count = await PostLikes.count({
    where: {
      postId,
    },
  });
  return count;
};

const createPostLike = async (userId, postId) => {
  const existsLike = await checkLike(userId, postId);

  if (existsLike) return error(400, "Already like");

  const like = await PostLikes.create({
    userId,
    postId,
  });
  return like;
};

const deletePostLike = async (userId, postId) => {
  const existsLike = await checkLike(userId, postId);

  if (!existsLike) return error(400, "Already unlike");

  const unlike = await PostLikes.destroy({
    where: { userId, postId },
  });
  return unlike;
};

module.exports = { checkLike, countPostLikes, createPostLike, deletePostLike };
