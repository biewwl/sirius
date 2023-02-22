const statusCode = require("../utils/statusCode");
const {
  Post,
  User,
  PostViews,
  PostLikes,
  PostComments,
  PostShares,
  PostSaved,
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
    ],
    // order: [["id", "DESC"]],
  });
  if (!post) return null;

  return post.dataValues;
};

const getPostCommentById = async (postId) => {
  const post = await PostComments.findAll({
    where: { postId },
    attributes: { exclude: ["userId", "postId"] },
    include: [
      {
        model: User,
        as: "userComment",
        attributes: ["name", "nick", "avatarUrl", "accountVerified"],
      },
    ],
  });
  if (!post) return null;

  return post;
};

const getPostCommentsCountById = async (postId) => {
  const post = await PostComments.count({
    where: { postId },
  });

  return post;
};

const getPostLikesCountById = async (postId) => {
  const post = await PostLikes.count({
    where: { postId },
  });

  return post;
};

const getPostViewsCountById = async (postId) => {
  const post = await PostViews.count({
    where: { postId },
  });

  return post;
};

const getPostsSavedById = async (userId) => {
  const posts = await PostSaved.findAll({
    where: { userId },
    attributes: { exclude: ["userId", "postId"] },
    include: [
      {
        model: Post,
        as: "postSaved",
        include: [
          {
            model: User,
            as: "userPost",
            attributes: ["name", "nick", "avatarUrl", "accountVerified"],
          },
        ],
      },
    ],
  });
  if (!posts) return null;

  return posts;
};

const getPostsBy = async (field, value) => {
  const post = await Post.findAll({
    where: { [field]: value },
    attributes: { exclude: ["userId"] },
    include: [
      {
        model: User,
        as: "userPost",
        attributes: ["name", "nick", "avatarUrl", "accountVerified"],
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
};

// Function to get post in database by "id" (without sensitive content)
const getPostById = async (id) => await getPostBy("id", id);
const getPostsById = async (userId) => await getPostsBy("userId", userId);

// Function to get posts count in database by "id"

const getPostsCountById = async (userId) => {
  const count = await Post.count({
    where: { userId },
  });
  return count;
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
    ],
    order: [["id", "DESC"]],
  });
  return results;
};

// Verify

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

// Actions

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
  verifyExistsPost,
  getPostById,
  getPostsById,
  getPostCommentById,
  getPostCommentsCountById,
  getPostLikesCountById,
  getPostViewsCountById,
  getPostsSavedById,
  getNickPostOwnerByPostId,
  getPostsCountById,
  getPostsFeedById,
  verifyAlreadyLike,
  verifyAlreadySaved,
  likePost,
  unlikePost,
  commentPost,
  uncommentPost,
  savePost,
  notSavePost,
};
