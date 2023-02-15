const statusCode = require("../utils/statusCode");

const validateQuery = async (req, res, next) => {
  try {
    const { query, limit } = req.query;
    const numberLimit = Number(limit);
    if (!query)
      throw new Error(
        `${statusCode.BAD_REQUEST_CODE} | Param query is required!`
      );
    if (isNaN(numberLimit))
      throw new Error(
        `${statusCode.BAD_REQUEST_CODE} | Limit must be a number!`
      );
    req.query.limit = numberLimit;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateQuery;
