const { verifyUserBlock } = require("../services/block.service");
const userService = require("../services/user.service");

const validateBlock = async (req, res, next) => {
  try {
    const { nick: blockerNick } = req.params;
    const { userId: blockedId } = req;

    const blockerId = await userService.getUserIdByNick(blockerNick);

    if (!blockedId) return next();

    await userService.verifyExistsId(blockedId, "exists");

    const isBlocked = await verifyUserBlock({ blockerId, blockedId });

    if (isBlocked) throw new Error("401 | YOU HAVE BEEN BLOCKED");

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateBlock;
