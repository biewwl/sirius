const searchService = require("../services/search.service");
const statusCode = require("../utils/statusCode");

const findByQuery = async (req, res, next) => {
  try {
    const { query, limit } = req.query;
    const results = await searchService.findByQuery(query, limit);
    res.status(statusCode.SUCCESS_CODE).json(results);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findByQuery,
};
