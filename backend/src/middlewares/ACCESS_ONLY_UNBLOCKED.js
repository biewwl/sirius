const blockService = require("../services/block.service");
const userService = require("../services/user.service");

const ACCESS_ONLY_UNBLOCKED = async (req, res, next) => {
  try {
    const { userId: blockedId } = req;

    const { nick } = req.params;
    const blockerId = await userService.getUserIdByUserNick(nick);

    const block = await blockService.checkBlock(blockerId, blockedId);

    if (block) throw new Error("403 | You have been blocked");

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = ACCESS_ONLY_UNBLOCKED;
