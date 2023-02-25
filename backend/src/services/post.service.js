const { Post, User } = require("../db/models");
const followService = require("./follow.service");
const userService = require("./user.service");

const checkExistsPost = async (postId) => {
  const exists = await Post.findOne({
    where: { id: postId },
    attributes: ["id"],
  });
  const existsBoolean = exists ? true : false;
  return existsBoolean;
};

const getPostOwnerNickByPostId = async (postId) => {
  const user = await Post.findOne({
    where: { id: postId },
    attributes: [],
    include: [
      {
        model: User,
        as: "userPost",
        attributes: ["nick"],
      },
    ],
  });

  const { nick } = user.userPost;
  return nick;
};

const dataPost = async (postId) => {
  const data = await Post.findOne({
    where: { id: postId },
    include: [
      {
        model: User,
        as: "userPost",
        attributes: { exclude: ["id", "email", "password"] },
      },
    ],
    attributes: { exclude: ["userId"] },
  });

  return data;
};

const listPosts = async (userId) => {
  const posts = await Post.findAll({
    where: { userId },
    include: [
      {
        model: User,
        as: "userPost",
        attributes: { exclude: ["id", "email", "password"] },
      },
    ],
    attributes: { exclude: ["userId"] },
  });

  return posts;
};

const countPosts = async (userId) => {
  const count = await Post.count({
    where: { userId },
  });

  return count;
};

const listFeed = async (userId) => {
  const following = await followService.listFollowing(userId, userId);

  const followingIds = await Promise.all(
    following.map(async (follow) => {
      const { nick } = follow;
      const id = await userService.getUserIdByUserNick(nick);
      return id;
    })
  );

  const allUsers = [...followingIds, userId];

  const posts = await Post.findAll({
    where: {
      userId: allUsers,
    },
    order: [["id", "DESC"]],
    include: [
      {
        model: User,
        as: "userPost",
        attributes: { exclude: ["id", "email", "password"] },
      },
    ],
    attributes: { exclude: ["userId"] },
  });

  return posts;
};

module.exports = {
  checkExistsPost,
  getPostOwnerNickByPostId,
  dataPost,
  listPosts,
  countPosts,
  listFeed,
};
