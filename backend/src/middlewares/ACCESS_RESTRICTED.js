const userService = require("../services/user.service");
const followService = require("../services/follow.service");
const blockService = require("../services/block.service");
const validateToken = require("../utils/validateToken");

const ACCESS_RESTRICTED = async (req, _res, next) => {
  try {
    const { nick } = req.params;
    const { authorization } = req.headers;
    const userId = await userService.getUserIdByUserNick(nick);
    const accountPrivacy = await userService.getAccountPrivacy(userId);

    if (accountPrivacy === "private") {
      if (!authorization) throw new Error("403 | This Account is Private");
      const { id, error } = await validateToken(authorization);
      if (error) {
        throw new Error(`400 | Invalid token`);
      }

      req.userId = id;

      if (id === userId) return next();

      const follow = await followService.checkFollow(id, userId);

      if (!follow) throw new Error("403 | This Account is Private");

      return next();
    } else if (accountPrivacy === "public") {
      if (!authorization) {
        return next();
      } else {
        const { id, error } = await validateToken(authorization);
        if (error) {
          throw new Error(`400 | Invalid token`);
        }

        req.userId = id;
        
        if (userId === id) return next();

        const blocked = await blockService.checkBlock(userId, id);
        if (blocked) throw new Error("403 | You have been blocked");

        return next();
      }
    }

    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = ACCESS_RESTRICTED;

// This middleware passes ONLY in the following cases:

// HYPOTHESIS 1: The requested information belongs to a PUBLIC account:

// 1. The account is not logged in,
// 2. The account is logged in and not blocked

// HYPOTHESIS 2: The requested information belongs to a PRIVATE account

// 1. The account must be logged in and following
