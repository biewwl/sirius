const { verifyExistsNick } = require("../services/user.service");

const validateNickInParamsExists = async (req, _res, next) => {
  try {
    const { nick } = req.params;
    if (!nick) throw new Error("401 | Lost Nick");
    await verifyExistsNick(nick, "exists");
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateNickInParamsExists;
