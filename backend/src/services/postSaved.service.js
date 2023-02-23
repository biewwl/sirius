const {
  Post,
  PostSaved,
} = require("../db/models");
const { userWithoutSensitiveFields } = require("../utils/includeQuery");

const getPostsSavedById = async (userId) => {
  const posts = await PostSaved.findAll({
    where: { userId },
    attributes: { exclude: ["userId", "postId"] },
    include: [
      {
        model: Post,
        as: "postSaved",
        include: [userWithoutSensitiveFields("userPost")],
      },
    ],
  });
  if (!posts) return null;
  return posts;
};

const verifyAlreadySaved = async (postId, userId) => {
  const saved = await PostSaved.findOne({
    where: {
      postId,
      userId,
    },
  });
  if (saved) return true;
  return false;
};

const savePost = async (postId, userId) => {
  const result = await PostSaved.create({
    postId,
    userId,
  });
  return result;
};

const notSavePost = async (postId, userId) => {
  const result = await PostSaved.destroy({
    where: {
      postId,
      userId,
    },
  });
  return result;
};

module.exports = {
  getPostsSavedById,
  verifyAlreadySaved,
  savePost,
  notSavePost,
};
