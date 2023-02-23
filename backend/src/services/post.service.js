const statusCode = require("../utils/statusCode");
const { Post } = require("../db/models");
const { userWithoutSensitiveFields } = require("../utils/includeQuery");

const getPostById = async (id) => {
  const post = await Post.findOne({
    where: { id },
    attributes: { exclude: ["userId"] },
    include: [userWithoutSensitiveFields("userPost")],
  });
  if (!post) return null;

  return post.dataValues;
};

const getPostsByUserId = async (userId) => {
  const post = await Post.findAll({
    where: { userId },
    attributes: { exclude: ["userId"] },
    include: [userWithoutSensitiveFields("userPost")],
    order: [["id", "DESC"]],
  });
  if (!post) return null;

  return post;
};

const getPostsFeedById = async (ids) => {
  const results = await Post.findAll({
    where: {
      userId: ids,
    },
    attributes: { exclude: ["userId"] },
    include: [userWithoutSensitiveFields("userPost")],
    order: [["id", "DESC"]],
  });
  return results;
};

const getNickPostOwnerByPostId = async (id) => {
  const post = await Post.findOne({
    where: { id },
    attributes: [],
    include: [userWithoutSensitiveFields("userPost")],
  });
  if (!post) return null;
  return post.dataValues.userPost.dataValues.nick;
};

const getPostsCountById = async (userId) => {
  const count = await Post.count({
    where: { userId },
  });
  return count;
};

const verifyExistsPost = async (postId, CASE) => {
  const post = await getPostById(postId);
  if (!CASE) {
    return post ? true : false;
  }
  if (CASE === "exists") {
    if (!post)
      throw new Error(`${statusCode.NOT_FOUND_CODE} | post not Found!`);
  }
  if (CASE === "nonexistent") {
    if (post)
      throw new Error(`${statusCode.BAD_REQUEST_CODE} | post already exists!`);
  }
};

module.exports = {
  getPostById,
  getPostsByUserId,
  getNickPostOwnerByPostId,
  getPostsCountById,
  getPostsFeedById,
  verifyExistsPost,
};
