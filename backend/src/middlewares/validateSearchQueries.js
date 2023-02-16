const statusCode = require("../utils/statusCode");

const validateQuery = async (req, res, next) => {
  try {
    const { query, limit, offset } = req.query;
    const numberLimit = Number(limit);
    const offsetLimit = Number(offset);
    if (!query)
      throw new Error(
        `${statusCode.BAD_REQUEST_CODE} | Param query is required!`
      );
    if (isNaN(numberLimit))
      throw new Error(
        `${statusCode.BAD_REQUEST_CODE} | Limit must be a number!`
      );
    if (isNaN(offset))
      throw new Error(
        `${statusCode.BAD_REQUEST_CODE} | Offset must be a number!`
      );
    req.query.limit = numberLimit;
    req.query.offset = offsetLimit;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateQuery;
