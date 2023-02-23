const postSavedService = require("../services/postSaved.service");
const statusCode = require("../utils/statusCode");

const getPostsSavedById = async (req, res, next) => {
  try {
    const { userId } = req;
    const result = await postSavedService.getPostsSavedById(userId);
    res.status(statusCode.SUCCESS_CODE).json(result);
  } catch (error) {
    next(error);
  }
};

const getISavePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req;
    const iSave = await postSavedService.verifyAlreadySaved(postId, userId);
    return res.status(statusCode.SUCCESS_CODE).json(iSave);
  } catch (error) {
    next(error);
  }
};

const savePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req;

    const alreadySaved = await postSavedService.verifyAlreadySaved(
      postId,
      userId
    );
    if (alreadySaved) throw new Error("400 | Already Saved");

    await postSavedService.savePost(postId, userId);

    res.status(statusCode.NO_CONTENT_CODE).json();
  } catch (error) {
    next(error);
  }
};

const notSavePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req;

    const alreadySaved = await postSavedService.verifyAlreadySaved(
      postId,
      userId
    );
    if (!alreadySaved) throw new Error("400 | Post not saved");

    await postSavedService.notSavePost(postId, userId);

    res.status(statusCode.NO_CONTENT_CODE).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPostsSavedById,
  getISavePost,
  savePost,
  notSavePost,
};
