const blockService = require("../services/block.service");
const userService = require("../services/user.service");
const { formatBlocks } = require("../utils");

const getBlocked = async (req, res, next) => {
  try {
    const { nick } = req.params;
    const id = await userService.getUserIdByNick(nick);
    const blocked = await blockService.getBlockedForId(id);
    const formattedBlocked = formatBlocks(blocked);
    res.status(200).json(formattedBlocked);
  } catch (error) {
    next(error);
  }
};

const getBlockedCount = async (req, res, next) => {
  try {
    const { nick } = req.params;
    const id = await userService.getUserIdByNick(nick);
    const followersCount = await blockService.getBlockedCountForId(id);
    res.status(200).json(followersCount);
  } catch (error) {
    next(error);
  }
};

const blockUser = async (req, res, next) => {
  try {
    const blockedNick = req.params["nick"];
    const blockedId = await userService.getUserIdByNick(blockedNick);
    const { userId: blockerId } = req;
    if (blockerId === blockedId)
      throw new Error("401 | Block yourself is not allowed");
    await blockService.blockUser({ blockerId, blockedId });
    res.status(200).json("ok");
  } catch (error) {
    next(error);
  }
};

const unblockUser = async (req, res, next) => {
  try {
    const blockedNick = req.params["nick"];
    const blockedId = await userService.getUserIdByNick(blockedNick);
    const { userId: blockerId } = req;
    if (blockerId === blockedId)
      throw new Error("401 | Follow yourself is not allowed");
    await blockService.unblockUser({ blockerId, blockedId });
    res.status(200).json("ok");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBlocked,
  getBlockedCount,
  blockUser,
  unblockUser,
};
