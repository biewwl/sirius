const statusCode = require("../utils/statusCode");
const {
  Post,
  PostViews,
  PostLikes,
  PostComments,
  PostSaved,
} = require("../db/models");
const { userWithoutSensitiveFields } = require("../utils/includeQuery");
const fileService = require("./file.service");
const userService = require("./user.service");

const getPostById = async (id) => {
  const post = await Post.findOne({
    where: { id },
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

const getPostCommentsById = async (postId) => {
  const post = await PostComments.findAll({
    where: { postId },
    attributes: { exclude: ["userId", "postId"] },
    include: [userWithoutSensitiveFields("userComment")],
  });
  if (!post) return null;

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
        include: [userWithoutSensitiveFields("userPost")],
      },
    ],
  });
  if (!posts) return null;
  return posts;
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

const getPostActionsCountById = async (model, postId) => {
  const count = await model.count({
    where: { postId },
  });

  return count;
};

const getPostCommentsCountById = async (postId) =>
  await getPostActionsCountById(PostComments, postId);

const getPostLikesCountById = async (postId) =>
  await getPostActionsCountById(PostLikes, postId);

const getPostViewsCountById = async (postId) =>
  await getPostActionsCountById(PostViews, postId);

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

const verifyAlreadyAction = async (model, postId, userId) => {
  const action = await model.findOne({
    where: {
      postId,
      userId,
    },
  });
  if (action) return true;
  return false;
};

const verifyAlreadyLike = async (postId, userId) =>
  await verifyAlreadyAction(PostLikes, postId, userId);

const verifyAlreadySaved = async (postId, userId) =>
  await verifyAlreadyAction(PostSaved, postId, userId);

const doAction = async (model, postId, userId) => {
  const result = await model.create({
    postId,
    userId,
  });
  return result;
};

const likePost = async (postId, userId) =>
  await doAction(PostLikes, postId, userId);

const savePost = async (postId, userId) =>
  await doAction(PostSaved, postId, userId);

const undoAction = async (model, postId, userId) => {
  const result = await model.destroy({
    where: {
      postId,
      userId,
    },
  });
  return result;
};

const unlikePost = async (postId, userId) =>
  await undoAction(PostLikes, postId, userId);

const notSavePost = async (postId, userId) =>
  await undoAction(PostSaved, postId, userId);

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

const createPost = async ({ fileInfo, postData, userId }) => {
  const file = fileInfo ? fileInfo : { name: null, folder: null };

  const { name, folder } = file;

  if (fileInfo) {
    await fileService.createFile(file, userId);
  }

  const { caption } = postData;

  const imageUrl = fileInfo
    ? `http://10.0.0.98:3010/files/${folder}|${name}`
    : "";

  const post = await Post.create({
    userId,
    caption,
    date: Date.now(),
    imageUrl,
  });

  return post;
};

const deletePost = async (postId, userId) => {
  const postData = await getPostById(postId);

  const { imageUrl } = postData;
  const file = imageUrl ?? "";

  if (file.includes("http://10.0.0.98:3010/files/")) {
    const folderAndFileName = file.split("http://10.0.0.98:3010/files/")[1];

    const [folder, name] = folderAndFileName.split("|");

    await fileService.deleteFile({ name, folder }, userId);
  }

  const post = await Post.destroy({ where: { id: postId } });

  const userData = await userService.getUserById(userId);
  const { avatarUrl, coverUrl, name } = userData;

  if (imageUrl === avatarUrl) {
    await userService.updateUserData(userId, {
      avatarUrl:
        `https://ui-avatars.com/api/?name=${name}&size=512&color=727272`,
    });
  }
  if (imageUrl === coverUrl) {
    await userService.updateUserData(userId, {
      coverUrl: "https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png",
    });
  }

  return post;
};

module.exports = {
  verifyExistsPost,
  getPostById,
  getPostsByUserId,
  getPostCommentsById,
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
  createPost,
  deletePost,
};
