const { verifyUserBlock } = require("../services/block.service");
const { getUserIdByNick } = require("../services/user.service");

const checkAccessIsBlocked = async (req, _res, next) => {
  try {
    const { nick: blockerNick } = req.params;
    const { userId: blockedId } = req;

    const blockerId = await getUserIdByNick(blockerNick);

    if (!blockedId) return next();

    const isBlocked = await verifyUserBlock({ blockerId, blockedId });

    if (isBlocked) throw new Error("401 | YOU HAVE BEEN BLOCKED");

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkAccessIsBlocked;
