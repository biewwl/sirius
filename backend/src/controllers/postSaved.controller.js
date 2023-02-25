const postSavedService = require("../services/postSaved.service");

const checkISave = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req;

    const iSave = await postSavedService.checkSave(userId, postId);

    return res.status(200).json(iSave);
  } catch (error) {
    next(error);
  }
};

const listSaved = async (req, res, next) => {
  try {
    const { userId } = req;

    const save = await postSavedService.listSaved(userId);

    return res.status(200).json(save);
  } catch (error) {
    next(error);
  }
};

const createPostSave = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req;

    const { error } = await postSavedService.createPostSave(userId, postId);

    if (error) {
      const { code, message } = error;
      throw new Error(`${code} | ${message}`);
    }

    return res.status(204).json();
  } catch (error) {
    next(error);
  }
};

const deletePostSave = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req;

    const { error } = await postSavedService.deletePostSave(userId, postId);

    if (error) {
      const { code, message } = error;
      throw new Error(`${code} | ${message}`);
    }

    return res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = { checkISave, listSaved, createPostSave, deletePostSave };
