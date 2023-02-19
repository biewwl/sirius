const { verifyExistsNick } = require("../services/user.service");
const statusCode = require("../utils/statusCode");

const validateNickInParamsExists = async (req, _res, next) => {
  try {
    const { nick } = req.params;

    if (!nick) throw new Error(`${statusCode.BAD_REQUEST_CODE} | Lost Nick`);
    await verifyExistsNick(nick, "exists");
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateNickInParamsExists;
