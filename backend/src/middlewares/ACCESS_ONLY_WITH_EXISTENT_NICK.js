const userService = require("../services/user.service");

const ACCESS_ONLY_WITH_EXISTENT_NICK = async (req, _res, next) => {
  try {
    const { nick } = req.params;
    if (!nick) throw new Error("400 | Nick is required");

    const validateUserNick = await userService.checkExistsUser("nick", nick);
    if (!validateUserNick) throw new Error("404 | User not found");

    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = ACCESS_ONLY_WITH_EXISTENT_NICK;
