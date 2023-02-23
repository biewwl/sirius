const { PostComments } = require("../db/models");
const { userWithoutSensitiveFields } = require("../utils/includeQuery");

const getPostCommentsById = async (postId) => {
  const post = await PostComments.findAll({
    where: { postId },
    attributes: { exclude: ["userId", "postId"] },
    include: [userWithoutSensitiveFields("userComment")],
  });
  if (!post) return null;

  return post;
};

const getPostCommentsCountById = async (postId) => {
  const count = await PostComments.count({
    where: { postId },
  });

  return count;
};

const commentPost = async (postId, userId, comment) => {
  const result = await PostComments.create({
    postId,
    userId,
    comment,
  });
  return result;
};

const uncommentPost = async (id) => {
  const result = await PostComments.destroy({
    where: {
      id,
    },
  });
  return result;
};

module.exports = {
  getPostCommentsById,
  getPostCommentsCountById,
  commentPost,
  uncommentPost,
};
