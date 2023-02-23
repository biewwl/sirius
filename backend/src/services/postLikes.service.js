const {
  PostLikes,
} = require("../db/models");

const getPostLikesCountById = async (postId) => {
  const count = await PostLikes.count({
    where: { postId },
  });

  return count;
};

const verifyAlreadyLike = async (postId, userId) => {
  const like = await PostLikes.findOne({
    where: {
      postId,
      userId,
    },
  });
  if (like) return true;
  return false;
};

const likePost = async (postId, userId) => {
  const result = await PostLikes.create({
    postId,
    userId,
  });
  return result;
};

const unlikePost = async (postId, userId) => {
  const result = await PostLikes.destroy({
    where: {
      postId,
      userId,
    },
  });
  return result;
};

module.exports = {
  getPostLikesCountById,
  verifyAlreadyLike,
  likePost,
  unlikePost,
};
