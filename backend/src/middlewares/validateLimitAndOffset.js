const statusCode = require("../utils/statusCode");

const validateLimitAndOffset = (req, _res, next) => {
  try {
    const { limit, offset } = req.query;

    const numberLimit = Number(limit);
    const numberOffset = Number(offset);

    if (isNaN(numberLimit))
      throw new Error(
        `${statusCode.BAD_REQUEST_CODE} | Limit must be a number!`
      );
    if (isNaN(numberOffset))
      throw new Error(
        `${statusCode.BAD_REQUEST_CODE} | Offset must be a number!`
      );
    req.query.limit = numberLimit;
    req.query.offset = numberOffset;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateLimitAndOffset;
