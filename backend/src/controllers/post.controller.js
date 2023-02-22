const postService = require("../services/post.service");
const userService = require("../services/user.service");
const followService = require("../services/follow.service");
const statusCode = require("../utils/statusCode");
const getIdsList = require("../utils/getIdsList");

const getPostById = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const result = await postService.getPostById(postId);
    res.status(statusCode.SUCCESS_CODE).json(result);
  } catch (error) {
    next(error);
  }
};

const getPostCommentsById = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const result = await postService.getPostCommentById(postId);
    res.status(statusCode.SUCCESS_CODE).json(result);
  } catch (error) {
    next(error);
  }
};

const getPostCommentsCountById = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const result = await postService.getPostCommentsCountById(postId);
    res.status(statusCode.SUCCESS_CODE).json(result);
  } catch (error) {
    next(error);
  }
};

const getPostLikesCountById = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const result = await postService.getPostLikesCountById(postId);
    res.status(statusCode.SUCCESS_CODE).json(result);
  } catch (error) {
    next(error);
  }
};

const getPostViewsCountById = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const result = await postService.getPostViewsCountById(postId);
    res.status(statusCode.SUCCESS_CODE).json(result);
  } catch (error) {
    next(error);
  }
};

const getPostsSavedById = async (req, res, next) => {
  try {
    const { userId } = req;
    const result = await postService.getPostsSavedById(userId);
    res.status(statusCode.SUCCESS_CODE).json(result);
  } catch (error) {
    next(error);
  }
};

const getPostsById = async (req, res, next) => {
  try {
    const { nick } = req.params;
    const id = await userService.getUserIdByNick(nick);
    const result = await postService.getPostsById(id);
    res.status(statusCode.SUCCESS_CODE).json(result);
  } catch (error) {
    next(error);
  }
};

const getPostsCountById = async (req, res, next) => {
  try {
    const { nick } = req.params;
    const id = await userService.getUserIdByNick(nick);
    const result = await postService.getPostsCountById(id);
    res.status(statusCode.SUCCESS_CODE).json(result);
  } catch (error) {
    next(error);
  }
};

const getPostsFeedById = async (req, res, next) => {
  try {
    const { userId } = req;
    const followingList = await followService.getFollowingListById(
      userId,
      null,
      0
    );
    const followingIds = await getIdsList(followingList);
    const completeList = [userId, ...followingIds];
    const posts = await postService.getPostsFeedById(completeList);
    return res.status(statusCode.SUCCESS_CODE).json(posts);
  } catch (error) {
    next(error);
  }
};

const getILikePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req;
    const iLike = await postService.verifyAlreadyLike(postId, userId);
    return res.status(statusCode.SUCCESS_CODE).json(iLike);
  } catch (error) {
    next(error);
  }
};

const likePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req;

    const alreadyLike = await postService.verifyAlreadyLike(postId, userId);
    if (alreadyLike) throw new Error("400 | Already like");

    await postService.likePost(postId, userId);

    res.status(statusCode.NO_CONTENT_CODE).json();
  } catch (error) {
    next(error);
  }
};

const unlikePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req;

    const alreadyLike = await postService.verifyAlreadyLike(postId, userId);
    if (!alreadyLike) throw new Error("400 | Already unlike");

    await postService.unlikePost(postId, userId);

    res.status(statusCode.NO_CONTENT_CODE).json();
  } catch (error) {
    next(error);
  }
};

const commentPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { comment } = req.body;
    const { userId } = req;

    if (!comment) throw new Error("400 | Comment is required");

    await postService.commentPost(postId, userId, comment);
    res.status(statusCode.NO_CONTENT_CODE).json();
  } catch (error) {
    next(error);
  }
};

const getISavePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req;
    const iSave = await postService.verifyAlreadySaved(postId, userId);
    return res.status(statusCode.SUCCESS_CODE).json(iSave);
  } catch (error) {
    next(error);
  }
};

const savePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req;

    const alreadySaved = await postService.verifyAlreadySaved(postId, userId);
    if (alreadySaved) throw new Error("400 | Already Saved");

    await postService.savePost(postId, userId);

    res.status(statusCode.NO_CONTENT_CODE).json();
  } catch (error) {
    next(error);
  }
};

const notSavePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req;

    const alreadySaved = await postService.verifyAlreadySaved(postId, userId);
    if (!alreadySaved) throw new Error("400 | Post not saved");

    await postService.notSavePost(postId, userId);

    res.status(statusCode.NO_CONTENT_CODE).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPostById,
  getPostsById,
  getPostCommentsById,
  getPostCommentsCountById,
  getPostLikesCountById,
  getPostViewsCountById,
  getPostsSavedById,
  getPostsCountById,
  getPostsFeedById,
  getILikePost,
  likePost,
  unlikePost,
  commentPost,
  getISavePost,
  savePost,
  notSavePost
};
