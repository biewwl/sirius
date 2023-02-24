const { verifyExistsNick } = require("../services/user.service");
const statusCode = require("../utils/statusCode");

const validateNickInParamsExists = async (req, _res, next) => {
  try {
    const { nick } = req.params;
    if (!nick) throw new Error(`${statusCode.BAD_REQUEST_CODE} | Lost Nick`);
    const exists = await verifyExistsNick(nick);
    if (!exists) throw new Error("404 | User not Found");
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateNickInParamsExists;
