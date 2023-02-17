const statusCode = require("../utils/statusCode");

const validateQuery = async (req, res, next) => {
  try {
    const { query } = req.query;
    if (!query)
      throw new Error(
        `${statusCode.BAD_REQUEST_CODE} | Param query is required!`
      );
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateQuery;
