const {
  Post,
  User,
  PostViews,
  PostLikes,
  PostComments,
  PostShares,
  PostSaved
} = require("../db/models");

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
        attributes: ["name", "nick", "avatarUrl", "accountVerified"],
      },
      {
        model: PostViews,
        as: "postViews",
      },
    ],
    // order: [["id", "DESC"]],
  });
  if (!post) return null;

  return post.dataValues;
};

const getPostsBy = async (field, value) => {
  console.log(1);
  const post = await Post.findAll({
    where: { [field]: value },
    attributes: { exclude: ["userId"] },
    include: [
      {
        model: User,
        as: "userPost",
        attributes: ["name", "nick", "avatarUrl", "accountVerified"],
      },
      // {
      //   model: PostViews,
      //   as: "postViews",
      // },
      // {
      //   model: PostLikes,
      //   as: "postLikes",
      // },
      // {
      //   model: PostComments,
      //   as: "postComments",
      // },
      // {
      //   model: PostShares,
      //   as: "postShares",
      // },
      // {
      //   model: PostSaved,
      //   as: "postSaved",
      // },
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
      {
        model: PostViews,
        as: "postViews",
      },
    ],
  });
  if (!post) return null;

  return post.dataValues.userPost.dataValues.nick;
};

// Function to get post in database by "id" (without sensitive content)
const getPostById = async (id) => await getPostBy("id", id);
const getPostsById = async (userId) => await getPostsBy("userId", userId);

// Function to get posts count in database by "id"

const getPostsCountById = async (userId) => {
  const results = await Post.findAndCountAll({
    where: { userId },
  });
  return results.count;
};

const getPostsFeedById = async (ids) => {
  const results = await Post.findAll({
    where: {
      userId: ids,
    },
    attributes: { exclude: ["userId"] },
    include: [
      {
        model: User,
        as: "userPost",
        attributes: ["name", "nick", "avatarUrl", "accountVerified"],
      },
      {
        model: PostViews,
        as: "postViews",
      },
    ],
    order: [["id", "DESC"]],
  });
  return results;
};

module.exports = {
  getPostById,
  getPostsById,
  getNickPostOwnerByPostId,
  getPostsCountById,
  getPostsFeedById,
};
