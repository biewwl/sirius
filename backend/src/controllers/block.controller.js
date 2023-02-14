const blockService = require("../services/block.service");
const {
  alreadyFollowUser,
  unfollowUser,
} = require("../services/follow.service");
const userService = require("../services/user.service");
const { formatBlocks } = require("../utils");

const getBlockedList = async (req, res, next) => {
  try {
    const { nick } = req.params;
    const id = await userService.getUserIdByNick(nick);
    const blocked = await blockService.getBlockedListForId(id);
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

    const blockerIsFollowing = await alreadyFollowUser(blockerId, blockedId);
    const blockedIsFollowing = await alreadyFollowUser(blockedId, blockerId);

    if (blockerIsFollowing) {
      await unfollowUser({ senderId: blockerId, receiverId: blockedId });
    }
    if (blockedIsFollowing) {
      await unfollowUser({ senderId: blockedId, receiverId: blockerId });
    }

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

const iBlockUser = async (req, res, next) => {
  try {
    const blockedNick = req.params["nick"];
    const blockedId = await userService.getUserIdByNick(blockedNick);
    const { userId: blockerId } = req;
    if (blockerId === blockedId) return res.status(200).json(false);
    const blocked = await blockService.verifyUserBlock({
      blockedId,
      blockerId,
    });
    res.status(200).json(blocked);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBlockedList,
  getBlockedCount,
  blockUser,
  unblockUser,
  iBlockUser,
};
