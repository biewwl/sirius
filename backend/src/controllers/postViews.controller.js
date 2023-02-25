const postViewsService = require("../services/postViews.service");

const countPostViews = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const count = await postViewsService.countPostViews(postId);

    return res.status(200).json(count);
  } catch (error) {
    next(error);
  }
};

module.exports = { countPostViews };
