// const statusCode = require("../utils/statusCode");
const { Story } = require("../db/models");
const { userWithoutSensitiveFields } = require("../utils/includeQuery");

const getStoriesFeedById = async (ids) => {
  const results = await Story.findAll({
    where: {
      userId: ids,
    },
    attributes: { exclude: ["userId"] },
    include: [userWithoutSensitiveFields("userStory")],
    order: [["id", "DESC"]],
  });
  return results;
};

module.exports = {
  getStoriesFeedById,
};
