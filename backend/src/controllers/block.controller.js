const blockService = require("../services/block.service");
const {
  alreadyFollowUser,
  unfollowUser,
} = require("../services/follow.service");
const userService = require("../services/user.service");
const { formatBlocks } = require("../utils");
const statusCode = require("../utils/statusCode");

const getBlockedList = async (req, res, next) => {
  try {
    const { nick } = req.params;
    const id = await userService.getUserIdByNick(nick);
    const blocked = await blockService.getBlockedListForId(id);
    const formattedBlocked = formatBlocks(blocked);
    res.status(statusCode.SUCCESS_CODE).json(formattedBlocked);
  } catch (error) {
    next(error);
  }
};

const getBlockedCount = async (req, res, next) => {
  try {
    const { nick } = req.params;
    const id = await userService.getUserIdByNick(nick);
    const followersCount = await blockService.getBlockedCountForId(id);
    res.status(statusCode.SUCCESS_CODE).json(followersCount);
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
      throw new Error(
        `${statusCode.BAD_REQUEST_CODE} | Block yourself is not allowed`
      );
    await blockService.blockUser({ blockerId, blockedId });
    const blockerIsFollowing = await alreadyFollowUser(blockerId, blockedId);
    const blockedIsFollowing = await alreadyFollowUser(blockedId, blockerId);
    if (blockerIsFollowing) {
      await unfollowUser({ senderId: blockerId, receiverId: blockedId });
    }
    if (blockedIsFollowing) {
      await unfollowUser({ senderId: blockedId, receiverId: blockerId });
    }
    res.status(statusCode.NO_CONTENT_CODE).json();
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
      throw new Error(
        `${statusCode.BAD_REQUEST_CODE} | Follow yourself is not allowed`
      );
    await blockService.unblockUser({ blockerId, blockedId });
    res.status(statusCode.NO_CONTENT_CODE).json();
  } catch (error) {
    next(error);
  }
};

const iBlockUser = async (req, res, next) => {
  try {
    const blockedNick = req.params["nick"];
    const blockedId = await userService.getUserIdByNick(blockedNick);
    const { userId: blockerId } = req;
    if (blockerId === blockedId)
      return res.status(statusCode.SUCCESS_CODE).json(false);
    const blocked = await blockService.verifyUserBlock({
      blockedId,
      blockerId,
    });
    res.status(statusCode.SUCCESS_CODE).json(blocked);
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
