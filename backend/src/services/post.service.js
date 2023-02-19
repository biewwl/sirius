const { Post, User } = require("../db/models");
const statusCode = require("../utils/statusCode");

///////////////////////////////
///// GET USER IN DATABASE ////
///////////////////////////////

// Generic function to get post in database by any field (without sensitive content)
const getPostBy = async (field, value) => {
  const post = await Post.findOne({
    where: { [field]: value },
    attributes: { exclude: ["userId"] },
    include: [
      {
        model: User,
        as: "userPost",
        attributes: ["name", "nick", "avatarUrl"],
      },
    ],
    // order: [["id", "DESC"]],
  });
  if (!post) return null;

  return post.dataValues;
};

const getPostsBy = async (field, value) => {
  const post = await Post.findAll({
    where: { [field]: value },
    attributes: { exclude: ["userId"] },
    include: [
      {
        model: User,
        as: "userPost",
        attributes: ["name", "nick", "avatarUrl"],
      },
    ],
    order: [["id", "DESC"]],
  });
  if (!post) return null;

  return post;
};

const getNickPostOwnerByPostId = async (id) => {
  const post = await Post.findOne({
    where: { id },
    attributes: [],
    include: [
      {
        model: User,
        as: "userPost",
        attributes: ["nick"],
      },
    ],
  });
  if (!post) return null;

  return post.dataValues.userPost.dataValues.nick;
}

// Function to get post in database by "id" (without sensitive content)
const getPostById = async (id) => await getPostBy("id", id);
const getPostsById = async (userId) => await getPostsBy("userId", userId);

module.exports = {
  getPostById,
  getPostsById,
  getNickPostOwnerByPostId
};
