const postViewsService = require("../services/postViews.service");
const statusCode = require("../utils/statusCode");

const getPostViewsCountById = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const result = await postViewsService.getPostViewsCountById(postId);
    res.status(statusCode.SUCCESS_CODE).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPostViewsCountById,
};
