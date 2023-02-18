const { verifyUserBlock } = require("../services/block.service");
const { getUserIdByNick } = require("../services/user.service");
const statusCode = require("./statusCode");

const verifyBlock = async (blockedId, blockerNick) => {
  const blockerId = await getUserIdByNick(blockerNick); // Get id from blocker

  const isBlocked = await verifyUserBlock({ blockerId, blockedId });

  if (isBlocked) {
    const error = `${statusCode.FORBIDDEN_CODE} | YOU HAVE BEEN BLOCKED`;
    return { error };
  }
  return { status: "ok" };
};

module.exports = verifyBlock;
