const { PostViews } = require("../db/models");

const countPostViews = async (postId) => {
  const count = PostViews.count({
    where: { postId },
  });

  return count;
};

module.exports = { countPostViews };
