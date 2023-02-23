const { PostViews } = require("../db/models");

const getPostViewsCountById = async (postId) => {
  const count = await PostViews.count({
    where: { postId },
  });

  return count;
};

module.exports = {
  getPostViewsCountById,
};
