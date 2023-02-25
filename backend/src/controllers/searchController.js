const searchService = require("../services/searchService");

const listSearch = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query) throw new Error("400 | Param query is required");

    const results = await searchService.listSearch(query);

    return res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

module.exports = { listSearch };
