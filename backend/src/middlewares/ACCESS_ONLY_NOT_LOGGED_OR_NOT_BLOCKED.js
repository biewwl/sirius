const blockService = require("../services/block.service");
const userService = require("../services/user.service");
const validateToken = require("../utils/validateToken");

const ACCESS_ONLY_NOT_LOGGED_OR_NOT_BLOCKED = async (req, _res, next) => {
  try {
    const { authorization } = req.headers;
    const { nick } = req.params;
    const userId = await userService.getUserIdByUserNick(nick);

    if (!authorization) return next();

    const { id, error } = await validateToken(authorization);
    if (error) {
      throw new Error(`400 | Invalid token`);
    }

    req.userId = id;

    if (userId === "id") return next();

    const blocked = await blockService.checkBlock(userId, id);
    if (blocked) throw new Error("403 | You have been blocked");

    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = ACCESS_ONLY_NOT_LOGGED_OR_NOT_BLOCKED;
